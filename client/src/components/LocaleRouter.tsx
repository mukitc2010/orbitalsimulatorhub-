/**
 * LocaleRouter — Renders the correct page when path is /:locale/...
 * Redirects when locale is invalid (e.g. /simulator parsed as locale="simulator")
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { VALID_LOCALES, pathWithLocale } from "../lib/localeRoutes";
import { Home } from "../pages/Home";
import { Simulator } from "../pages/Simulator";
import { AstroBot } from "../pages/AstroBot";
import { PlanetHub } from "../pages/PlanetHub";
import { PlanetDetail } from "../pages/PlanetDetail";
import { ResearchHub } from "../pages/ResearchHub";
import { AerospaceReference } from "../pages/AerospaceReference";
import { AIInAerospace } from "../pages/AIInAerospace";
import { Blog } from "../pages/Blog";
import { BlogPost } from "../pages/BlogPost";
import { BlogCategory } from "../pages/BlogCategory";
import { AstronautExplorer } from "../pages/AstronautExplorer";
import { AstronautProfile } from "../pages/AstronautProfile";
import { MissionList } from "../pages/MissionList";
import { MissionTimeline } from "../pages/MissionTimeline";
import { MissionDetail } from "../pages/MissionDetail";
import { BroughtFromSpace } from "../pages/BroughtFromSpace";
import { NotFound } from "../pages/NotFound";
import { PlayLearn } from "../pages/PlayLearn";
import { LearnNewton } from "../pages/LearnNewton";
import { NewtonFormulas } from "../pages/NewtonFormulas";
import { KidsGuide } from "../pages/KidsGuide";
import { FormulaLibrary } from "../pages/FormulaLibrary";
import { RealSatelliteData } from "../pages/RealSatelliteData";
import { LearnOrbitalMechanics } from "../pages/LearnOrbitalMechanics";
import { SpaceQuestions } from "../pages/SpaceQuestions";
import { Calculators } from "../pages/Calculators";
import { SpaceExperiments } from "../pages/SpaceExperiments";
import { HowGPSWorks } from "../pages/HowGPSWorks";
import { CompareOrbits } from "../pages/CompareOrbits";
import { HowNASALaunches } from "../pages/HowNASALaunches";
import { HowSpaceXLands } from "../pages/HowSpaceXLands";
import { HowMarsRovers } from "../pages/HowMarsRovers";
import { HowStarlinkWorks } from "../pages/HowStarlinkWorks";
import { HowISSWorks } from "../pages/HowISSWorks";
import { OrbitalMechanicsQuiz } from "../pages/OrbitalMechanicsQuiz";
import { HowSolarSystemWorks } from "../pages/HowSolarSystemWorks";
import { WhatIsMoon } from "../pages/WhatIsMoon";
import { LunarGeology } from "../pages/LunarGeology";
import { Astrophysics } from "../pages/Astrophysics";
import { QuantumPhysics } from "../pages/QuantumPhysics";
import { QuantumPhysicsNASA } from "../pages/QuantumPhysicsNASA";
import { Aerodynamics } from "../pages/Aerodynamics";
import { QuantumSpace } from "../pages/QuantumSpace";
import { SpaceCareers } from "../pages/SpaceCareers";
import { NASAStudyGuide } from "../pages/NASAStudyGuide";
import { HowSatellitesWork } from "../pages/HowSatellitesWork";
import { AstronomyForKids } from "../pages/AstronomyForKids";
import { NASAForStudents } from "../pages/NASAForStudents";
import { SpaceNews } from "../pages/SpaceNews";
import { NASAForKids } from "../pages/NASAForKids";
import { SatelliteTutorial } from "../pages/SatelliteTutorial";
import { SpaceQuiz } from "../pages/SpaceQuiz";
import { NeuroSpaceResearch } from "../pages/NeuroSpaceResearch";
import { SpaceAGIDoctrine } from "../pages/SpaceAGIDoctrine";
import { SpaceAGIEngineeringLab } from "../pages/SpaceAGIEngineeringLab";
import { SpaceAGIRoadmap } from "../pages/SpaceAGIRoadmap";
import { SpaceAGIMathematics } from "../pages/SpaceAGIMathematics";
import { FutureSpaceCivilization } from "../pages/FutureSpaceCivilization";
import { Next100Years } from "../pages/Next100Years";
import { Welcome } from "../pages/Welcome";

const ROUTE_MAP: Array<{ pattern: RegExp; component: React.ComponentType<any>; param?: string }> = [
  { pattern: /^\/?$/, component: Home },
  { pattern: /^\/play\/?$/, component: PlayLearn },
  { pattern: /^\/simulator\/?$/, component: Simulator },
  { pattern: /^\/astrobot\/?$/, component: AstroBot },
  { pattern: /^\/planets\/?$/, component: PlanetHub },
  { pattern: /^\/planets\/([^/]+)\/?$/, component: PlanetDetail, param: "slug" },
  { pattern: /^\/research\/?$/, component: ResearchHub },
  { pattern: /^\/research\/neuro-space\/?$/, component: NeuroSpaceResearch },
  { pattern: /^\/research\/future-civilization\/?$/, component: FutureSpaceCivilization },
  { pattern: /^\/research\/next-100-years\/?$/, component: Next100Years },
  { pattern: /^\/research\/space-agi-doctrine\/?$/, component: SpaceAGIDoctrine },
  { pattern: /^\/research\/space-agi-lab\/?$/, component: SpaceAGIEngineeringLab },
  { pattern: /^\/research\/space-agi-roadmap\/?$/, component: SpaceAGIRoadmap },
  { pattern: /^\/research\/space-agi-math\/?$/, component: SpaceAGIMathematics },
  { pattern: /^\/learn\/aerospace\/?$/, component: AerospaceReference },
  { pattern: /^\/learn\/newton\/?$/, component: LearnNewton },
  { pattern: /^\/learn\/formulas\/?$/, component: NewtonFormulas },
  { pattern: /^\/guide\/?$/, component: KidsGuide },
  { pattern: /^\/formulas-library\/?$/, component: FormulaLibrary },
  { pattern: /^\/satellites\/?$/, component: RealSatelliteData },
  { pattern: /^\/learn\/orbital-mechanics\/?$/, component: LearnOrbitalMechanics },
  { pattern: /^\/learn\/space-questions\/?$/, component: SpaceQuestions },
  { pattern: /^\/calculators\/?$/, component: Calculators },
  { pattern: /^\/blog\/?$/, component: Blog },
  { pattern: /^\/blog\/category\/([^/]+)\/?$/, component: BlogCategory, param: "category" },
  { pattern: /^\/blog\/([^/]+)\/?$/, component: BlogPost, param: "slug" },
  { pattern: /^\/learn\/experiments\/?$/, component: SpaceExperiments },
  { pattern: /^\/learn\/how-gps-works\/?$/, component: HowGPSWorks },
  { pattern: /^\/learn\/how-nasa-launches-satellite\/?$/, component: HowNASALaunches },
  { pattern: /^\/learn\/how-spacex-lands-rockets\/?$/, component: HowSpaceXLands },
  { pattern: /^\/learn\/how-mars-rovers-work\/?$/, component: HowMarsRovers },
  { pattern: /^\/learn\/how-starlink-works\/?$/, component: HowStarlinkWorks },
  { pattern: /^\/learn\/how-iss-works\/?$/, component: HowISSWorks },
  { pattern: /^\/compare\/orbits\/?$/, component: CompareOrbits },
  { pattern: /^\/missions\/?$/, component: MissionList },
  { pattern: /^\/missions\/timeline\/?$/, component: MissionTimeline },
  { pattern: /^\/missions\/([^/]+)\/?$/, component: MissionDetail, param: "slug" },
  { pattern: /^\/artifacts\/?$/, component: BroughtFromSpace },
  { pattern: /^\/quiz\/orbital-mechanics\/?$/, component: OrbitalMechanicsQuiz },
  { pattern: /^\/learn\/how-solar-system-works\/?$/, component: HowSolarSystemWorks },
  { pattern: /^\/learn\/what-is-moon\/?$/, component: WhatIsMoon },
  { pattern: /^\/learn\/lunar-geology\/?$/, component: LunarGeology },
  { pattern: /^\/learn\/astrophysics\/?$/, component: Astrophysics },
  { pattern: /^\/learn\/quantum-physics\/?$/, component: QuantumPhysics },
  { pattern: /^\/learn\/quantum-physics-nasa\/?$/, component: QuantumPhysicsNASA },
  { pattern: /^\/learn\/aerodynamics\/?$/, component: Aerodynamics },
  { pattern: /^\/learn\/quantum-space\/?$/, component: QuantumSpace },
  { pattern: /^\/ai-in-aerospace\/?$/, component: AIInAerospace },
  { pattern: /^\/ai-in-space\/?$/, component: AIInAerospace },
  { pattern: /^\/careers\/?$/, component: SpaceCareers },
  { pattern: /^\/learn\/nasa-study-guide\/?$/, component: NASAStudyGuide },
  { pattern: /^\/learn\/how-satellites-work\/?$/, component: HowSatellitesWork },
  { pattern: /^\/learn\/astronomy-for-kids\/?$/, component: AstronomyForKids },
  { pattern: /^\/learn\/nasa-for-students\/?$/, component: NASAForStudents },
  { pattern: /^\/space-news\/?$/, component: SpaceNews },
  { pattern: /^\/learn\/nasa-for-kids\/?$/, component: NASAForKids },
  { pattern: /^\/learn\/satellite-tutorial\/?$/, component: SatelliteTutorial },
  { pattern: /^\/space-quiz\/?$/, component: SpaceQuiz },
  { pattern: /^\/astronauts\/?$/, component: AstronautExplorer },
  { pattern: /^\/astronauts\/([^/]+)\/?$/, component: AstronautProfile, param: "slug" },
  { pattern: /^\/welcome\/?$/, component: Welcome },
];

interface LocaleRouterProps {
  locale: string;
  rest: string;
}

export function LocaleRouter({ locale, rest }: LocaleRouterProps) {
  const [, setLocation] = useLocation();
  const basePath = rest ? `/${rest}` : "/";
  const invalidLocale = !VALID_LOCALES.has(locale);

  useEffect(() => {
    if (invalidLocale) setLocation(pathWithLocale(basePath, "en"));
  }, [invalidLocale, basePath, setLocation]);

  if (invalidLocale) return null;

  for (const { pattern, component: Component, param } of ROUTE_MAP) {
    const match = basePath.match(pattern);
    if (match) {
      const props: Record<string, string> = {};
      if (param && match[1]) props[param] = match[1];
      return <Component {...props} />;
    }
  }

  return <NotFound />;
}
