import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import * as db from "./db";
import {
  keplerianToCartesian,
  cartesianToKeplerian,
  propagateOrbit,
  elevationAngleDeg,
  getOrbitTemplate,
} from "./orbital";
import { askAstroBot } from "./astrobot";
import type { CartesianState, OrbitalElements } from "../shared/types";

const orbitalElementsSchema = z.object({
  semiMajorAxisKm: z.number().min(6371).max(100000),
  eccentricity: z.number().min(0).max(1),
  inclinationDeg: z.number().min(0).max(180),
  raanDeg: z.number().min(0).max(360),
  argPerigeeDeg: z.number().min(0).max(360),
  trueAnomalyDeg: z.number().min(0).max(360),
});

export const appRouter = router({
  // Orbital mechanics (pure calculations)
  orbital: router({
    createOrbit: publicProcedure
      .input(orbitalElementsSchema)
      .mutation(({ input }) => {
        const state = keplerianToCartesian(
          input.semiMajorAxisKm,
          input.eccentricity,
          input.inclinationDeg,
          input.raanDeg,
          input.argPerigeeDeg,
          input.trueAnomalyDeg
        );
        return { state, elements: input as OrbitalElements };
      }),
    propagateOrbit: publicProcedure
      .input(
        z.object({
          state: z.object({
            x: z.number(),
            y: z.number(),
            z: z.number(),
            vx: z.number(),
            vy: z.number(),
            vz: z.number(),
          }),
          dtSeconds: z.number(),
        })
      )
      .mutation(({ input }) => {
        const newState = propagateOrbit(
          input.state as CartesianState,
          input.dtSeconds
        );
        const elements = cartesianToKeplerian(newState);
        return { state: newState, elements };
      }),
    getOrbitalElements: publicProcedure
      .input(
        z.object({
          x: z.number(),
          y: z.number(),
          z: z.number(),
          vx: z.number(),
          vy: z.number(),
          vz: z.number(),
        })
      )
      .query(({ input }) => {
        return cartesianToKeplerian(input as CartesianState);
      }),
    calculateVisibility: publicProcedure
      .input(
        z.object({
          satX: z.number(),
          satY: z.number(),
          satZ: z.number(),
          latDeg: z.number(),
          lonDeg: z.number(),
        })
      )
      .query(({ input }) => {
        const elevationDeg = elevationAngleDeg(
          input.satX,
          input.satY,
          input.satZ,
          input.latDeg,
          input.lonDeg
        );
        return { elevationDeg, visible: elevationDeg >= 0 };
      }),
    getOrbitTemplate: publicProcedure
      .input(z.enum(["LEO", "MEO", "GEO"]))
      .query(({ input }) => getOrbitTemplate(input)),
  }),

  // AstroBot — NASA learning assistant
  astrobot: router({
    ask: publicProcedure
      .input(z.object({ question: z.string().min(1).max(500) }))
      .mutation(async ({ input }) => {
        return askAstroBot(input.question);
      }),
  }),

  // Satellites (DB)
  satellite: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          color: z.string(),
          orbitalElements: orbitalElementsSchema,
        })
      )
      .mutation(async ({ input }) => {
        const id = db.randomId();
        await db.createSatellite({
          id,
          name: input.name,
          color: input.color,
          semiMajorAxisKm: input.orbitalElements.semiMajorAxisKm,
          eccentricity: input.orbitalElements.eccentricity,
          inclinationDeg: input.orbitalElements.inclinationDeg,
          raanDeg: input.orbitalElements.raanDeg,
          argPerigeeDeg: input.orbitalElements.argPerigeeDeg,
          trueAnomalyDeg: input.orbitalElements.trueAnomalyDeg,
        });
        return { id, ...input };
      }),
    list: publicProcedure.query(() => db.listSatellites()),
    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          name: z.string().optional(),
          color: z.string().optional(),
          orbitalElements: orbitalElementsSchema.partial().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...rest } = input;
        const data: Record<string, unknown> = {};
        if (rest.name != null) data.name = rest.name;
        if (rest.color != null) data.color = rest.color;
        if (rest.orbitalElements) {
          Object.assign(data, {
            semiMajorAxisKm: rest.orbitalElements.semiMajorAxisKm,
            eccentricity: rest.orbitalElements.eccentricity,
            inclinationDeg: rest.orbitalElements.inclinationDeg,
            raanDeg: rest.orbitalElements.raanDeg,
            argPerigeeDeg: rest.orbitalElements.argPerigeeDeg,
            trueAnomalyDeg: rest.orbitalElements.trueAnomalyDeg,
          });
        }
        return db.updateSatellite(id, data as Parameters<typeof db.updateSatellite>[1]);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => db.deleteSatellite(input.id)),
  }),

  // Ground stations
  groundStation: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          latitudeDeg: z.number().min(-90).max(90),
          longitudeDeg: z.number().min(-180).max(180),
          elevationM: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const id = db.randomId();
        await db.createGroundStation({
          id,
          name: input.name,
          latitudeDeg: input.latitudeDeg,
          longitudeDeg: input.longitudeDeg,
          elevationM: input.elevationM,
        });
        return { id, ...input };
      }),
    list: publicProcedure.query(() => db.listGroundStations()),
    calculateVisibility: publicProcedure
      .input(
        z.object({
          satX: z.number(),
          satY: z.number(),
          satZ: z.number(),
          latDeg: z.number(),
          lonDeg: z.number(),
        })
      )
      .query(({ input }) => {
        const elevationDeg = elevationAngleDeg(
          input.satX,
          input.satY,
          input.satZ,
          input.latDeg,
          input.lonDeg
        );
        return { elevationDeg, visible: elevationDeg >= 0 };
      }),
  }),

  // Simulations
  simulation: router({
    create: publicProcedure
      .input(
        z.object({
          satelliteIds: z.array(z.string()).optional(),
          speedMultiplier: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const id = db.randomId();
        await db.createSimulation({
          id,
          currentTime: new Date(),
          speedMultiplier: input.speedMultiplier ?? 1,
          satelliteIds: input.satelliteIds ?? [],
        });
        return { id, currentTime: new Date().toISOString(), ...input };
      }),
    getState: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => db.getSimulation(input.id)),
    step: publicProcedure
      .input(
        z.object({
          id: z.string(),
          dtSeconds: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        const sim = await db.getSimulation(input.id);
        if (!sim) return null;
        const nextTime = new Date(
          new Date(sim.currentTime).getTime() + input.dtSeconds * 1000
        );
        await db.updateSimulation(input.id, { currentTime: nextTime });
        return { currentTime: nextTime.toISOString() };
      }),
    setSpeed: publicProcedure
      .input(
        z.object({
          id: z.string(),
          speedMultiplier: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateSimulation(input.id, {
          speedMultiplier: input.speedMultiplier,
        });
        return { speedMultiplier: input.speedMultiplier };
      }),
  }),
});

export type AppRouter = typeof appRouter;
