import { lazy, Suspense } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Route, Switch } from "wouter";
import { NavigationHeader } from "./components/NavigationHeader";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";


const SpaceMathGame = lazy(() => import("./pages/SpaceMathGame").then((m) => ({ default: m.SpaceMathGame })));
const OrbitMissionControl = lazy(() => import("./pages/OrbitMissionControl").then((m) => ({ default: m.OrbitMissionControl })));
const ASIMissionControl = lazy(() => import("./pages/ASIMissionControl").then((m) => ({ default: m.ASIMissionControl })));
const SpaceRobotResearch = lazy(() => import("./pages/SpaceRobotResearch").then((m) => ({ default: m.SpaceRobotResearch })));
const PlayLearn = lazy(() => import("./pages/PlayLearn").then((m) => ({ default: m.PlayLearn })));
const Simulator = lazy(() => import("./pages/Simulator").then((m) => ({ default: m.Simulator })));
const LearnNewton = lazy(() => import("./pages/LearnNewton").then((m) => ({ default: m.LearnNewton })));
const NewtonFormulas = lazy(() => import("./pages/NewtonFormulas").then((m) => ({ default: m.NewtonFormulas })));
const KidsGuide = lazy(() => import("./pages/KidsGuide").then((m) => ({ default: m.KidsGuide })));
const AstroBot = lazy(() => import("./pages/AstroBot").then((m) => ({ default: m.AstroBot })));
const ResearchHub = lazy(() => import("./pages/ResearchHub").then((m) => ({ default: m.ResearchHub })));
const AerospaceReference = lazy(() => import("./pages/AerospaceReference").then((m) => ({ default: m.AerospaceReference })));
const FormulaLibrary = lazy(() => import("./pages/FormulaLibrary").then((m) => ({ default: m.FormulaLibrary })));
const RealSatelliteData = lazy(() => import("./pages/RealSatelliteData").then((m) => ({ default: m.RealSatelliteData })));
const LearnOrbitalMechanics = lazy(() => import("./pages/LearnOrbitalMechanics").then((m) => ({ default: m.LearnOrbitalMechanics })));
const SpaceQuestions = lazy(() => import("./pages/SpaceQuestions").then((m) => ({ default: m.SpaceQuestions })));
const Calculators = lazy(() => import("./pages/Calculators").then((m) => ({ default: m.Calculators })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const BlogCategory = lazy(() => import("./pages/BlogCategory").then((m) => ({ default: m.BlogCategory })));
const RecommendedBooks = lazy(() => import("./pages/RecommendedBooks").then((m) => ({ default: m.RecommendedBooks })));
const SpaceShop = lazy(() => import("./pages/SpaceShop").then((m) => ({ default: m.SpaceShop })));
const SpaceExperiments = lazy(() => import("./pages/SpaceExperiments").then((m) => ({ default: m.SpaceExperiments })));
const HowGPSWorks = lazy(() => import("./pages/HowGPSWorks").then((m) => ({ default: m.HowGPSWorks })));
const CompareOrbits = lazy(() => import("./pages/CompareOrbits").then((m) => ({ default: m.CompareOrbits })));
const HowNASALaunches = lazy(() => import("./pages/HowNASALaunches").then((m) => ({ default: m.HowNASALaunches })));
const HowSpaceXLands = lazy(() => import("./pages/HowSpaceXLands").then((m) => ({ default: m.HowSpaceXLands })));
const HowMarsRovers = lazy(() => import("./pages/HowMarsRovers").then((m) => ({ default: m.HowMarsRovers })));
const HowStarlinkWorks = lazy(() => import("./pages/HowStarlinkWorks").then((m) => ({ default: m.HowStarlinkWorks })));
const HowISSWorks = lazy(() => import("./pages/HowISSWorks").then((m) => ({ default: m.HowISSWorks })));
const MissionTimeline = lazy(() => import("./pages/MissionTimeline").then((m) => ({ default: m.MissionTimeline })));
const MissionList = lazy(() => import("./pages/MissionList").then((m) => ({ default: m.MissionList })));
const MissionDetail = lazy(() => import("./pages/MissionDetail").then((m) => ({ default: m.MissionDetail })));
const BroughtFromSpace = lazy(() => import("./pages/BroughtFromSpace").then((m) => ({ default: m.BroughtFromSpace })));
const OrbitalMechanicsQuiz = lazy(() => import("./pages/OrbitalMechanicsQuiz").then((m) => ({ default: m.OrbitalMechanicsQuiz })));
const HowSolarSystemWorks = lazy(() => import("./pages/HowSolarSystemWorks").then((m) => ({ default: m.HowSolarSystemWorks })));
const WhatIsMoon = lazy(() => import("./pages/WhatIsMoon").then((m) => ({ default: m.WhatIsMoon })));
const Astrophysics = lazy(() => import("./pages/Astrophysics").then((m) => ({ default: m.Astrophysics })));
const QuantumPhysics = lazy(() => import("./pages/QuantumPhysics").then((m) => ({ default: m.QuantumPhysics })));
const QuantumPhysicsNASA = lazy(() => import("./pages/QuantumPhysicsNASA").then((m) => ({ default: m.QuantumPhysicsNASA })));
const Aerodynamics = lazy(() => import("./pages/Aerodynamics").then((m) => ({ default: m.Aerodynamics })));
const QuantumSpace = lazy(() => import("./pages/QuantumSpace").then((m) => ({ default: m.QuantumSpace })));
const AIInAerospace = lazy(() => import("./pages/AIInAerospace").then((m) => ({ default: m.AIInAerospace })));
const SpaceCareers = lazy(() => import("./pages/SpaceCareers").then((m) => ({ default: m.SpaceCareers })));
const NASAStudyGuide = lazy(() => import("./pages/NASAStudyGuide").then((m) => ({ default: m.NASAStudyGuide })));
const HowSatellitesWork = lazy(() => import("./pages/HowSatellitesWork").then((m) => ({ default: m.HowSatellitesWork })));
const AstronomyForKids = lazy(() => import("./pages/AstronomyForKids").then((m) => ({ default: m.AstronomyForKids })));
const NASAForStudents = lazy(() => import("./pages/NASAForStudents").then((m) => ({ default: m.NASAForStudents })));
const SpaceNews = lazy(() => import("./pages/SpaceNews").then((m) => ({ default: m.SpaceNews })));
const NASAForKids = lazy(() => import("./pages/NASAForKids").then((m) => ({ default: m.NASAForKids })));
const SatelliteTutorial = lazy(() => import("./pages/SatelliteTutorial").then((m) => ({ default: m.SatelliteTutorial })));
const SpaceQuiz = lazy(() => import("./pages/SpaceQuiz").then((m) => ({ default: m.SpaceQuiz })));
const PlatformBlueprint = lazy(() => import("./pages/PlatformBlueprint").then((m) => ({ default: m.PlatformBlueprint })));
const AstronautExplorer = lazy(() => import("./pages/AstronautExplorer").then((m) => ({ default: m.AstronautExplorer })));
const AstronautProfile = lazy(() => import("./pages/AstronautProfile").then((m) => ({ default: m.AstronautProfile })));
const PlanetHub = lazy(() => import("./pages/PlanetHub").then((m) => ({ default: m.PlanetHub })));
const PlanetDetail = lazy(() => import("./pages/PlanetDetail").then((m) => ({ default: m.PlanetDetail })));
const LunarGeology = lazy(() => import("./pages/LunarGeology").then((m) => ({ default: m.LunarGeology })));
const NeuroSpaceResearch = lazy(() => import("./pages/NeuroSpaceResearch").then((m) => ({ default: m.NeuroSpaceResearch })));
const SpaceAGIDoctrine = lazy(() => import("./pages/SpaceAGIDoctrine").then((m) => ({ default: m.SpaceAGIDoctrine })));
const SpaceAGIEngineeringLab = lazy(() => import("./pages/SpaceAGIEngineeringLab").then((m) => ({ default: m.SpaceAGIEngineeringLab })));
const SpaceAGIRoadmap = lazy(() => import("./pages/SpaceAGIRoadmap").then((m) => ({ default: m.SpaceAGIRoadmap })));
const SpaceAGIMathematics = lazy(() => import("./pages/SpaceAGIMathematics").then((m) => ({ default: m.SpaceAGIMathematics })));
const MathHistory = lazy(() => import("./pages/MathHistory").then((m) => ({ default: m.MathHistory })));
const SpaceAGIExplanation = lazy(() => import("./pages/SpaceAGIExplanation").then((m) => ({ default: m.SpaceAGIExplanation })));
const AGIASIFramework = lazy(() => import("./pages/AGIASIFramework").then((m) => ({ default: m.AGIASIFramework })));
const PMPNMPCControlFramework = lazy(() => import("./pages/PMPNMPCControlFramework").then((m) => ({ default: m.PMPNMPCControlFramework })));
const ASIAstronautMathematics = lazy(() => import("./pages/ASIAstronautMathematics").then((m) => ({ default: m.ASIAstronautMathematics })));
const SpaceAGISwarmSimulator = lazy(() => import("./pages/SpaceAGISwarmSimulator").then((m) => ({ default: m.SpaceAGISwarmSimulator })));
const AIAstronautRobotSimulator = lazy(() => import("./pages/AIAstronautRobotSimulator").then((m) => ({ default: m.AIAstronautRobotSimulator })));
const SpacecraftOperations = lazy(() => import("./pages/SpacecraftOperations").then((m) => ({ default: m.SpacecraftOperations })));
const EulerOrbitalLab = lazy(() => import("./pages/EulerOrbitalLab").then((m) => ({ default: m.EulerOrbitalLab })));
const QuantumSpaceAGISimulator = lazy(() => import("./pages/QuantumSpaceAGISimulator").then((m) => ({ default: m.QuantumSpaceAGISimulator })));
const QuantumSpaceAGILab = lazy(() => import("./pages/QuantumSpaceAGILab").then((m) => ({ default: m.QuantumSpaceAGILab })));
const QuantumSpaceAGIScenario = lazy(() => import("./pages/QuantumSpaceAGIScenario").then((m) => ({ default: m.QuantumSpaceAGIScenario })));
const QuantumSpaceAGICompare = lazy(() => import("./pages/QuantumSpaceAGICompare").then((m) => ({ default: m.QuantumSpaceAGICompare })));
const FutureSpaceCivilization = lazy(() => import("./pages/FutureSpaceCivilization").then((m) => ({ default: m.FutureSpaceCivilization })));
const Next100Years = lazy(() => import("./pages/Next100Years").then((m) => ({ default: m.Next100Years })));
const MarketingAIAgent = lazy(() => import("./pages/MarketingAIAgent").then((m) => ({ default: m.MarketingAIAgent })));
const Welcome = lazy(() => import("./pages/Welcome").then((m) => ({ default: m.Welcome })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));

function App() {
  return (
    <div className="app-shell min-h-screen blueprint-bg flex flex-col">
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="orbital-ring" />
      <SEOHead />
      <NavigationHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1 relative">
        <Suspense fallback={<div className="min-h-[40vh]" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/games/space-math" component={SpaceMathGame} />
          <Route path="/play" component={PlayLearn} />
          <Route path="/simulator" component={Simulator} />
          <Route path="/simulator/mission-control" component={OrbitMissionControl} />
          <Route path="/asi-mission-control" component={ASIMissionControl} />
          <Route path="/simulator/swarm" component={SpaceAGISwarmSimulator} />
          <Route path="/simulator/ai-astronaut-robot" component={AIAstronautRobotSimulator} />
          <Route path="/simulator/spacecraft" component={SpacecraftOperations} />
          <Route path="/simulator/euler-lab" component={EulerOrbitalLab} />
          <Route path="/quantum-space-agi" component={QuantumSpaceAGILab} />
          <Route path="/quantum-space-agi/scenario" component={QuantumSpaceAGIScenario} />
          <Route path="/quantum-space-agi/sim" component={QuantumSpaceAGISimulator} />
          <Route path="/quantum-space-agi/compare" component={QuantumSpaceAGICompare} />
          <Route path="/simulator/quantum-space-agi" component={QuantumSpaceAGISimulator} />
          <Route path="/learn/newton" component={LearnNewton} />
          <Route path="/learn/formulas" component={NewtonFormulas} />
          <Route path="/guide" component={KidsGuide} />
          <Route path="/astrobot" component={AstroBot} />
          <Route path="/research" component={ResearchHub} />
          <Route path="/research/autonomous-space-robots" component={SpaceRobotResearch} />
          <Route path="/research/neuro-space" component={NeuroSpaceResearch} />
          <Route path="/research/future-civilization" component={FutureSpaceCivilization} />
          <Route path="/research/next-100-years" component={Next100Years} />
          <Route path="/research/space-agi-doctrine" component={SpaceAGIDoctrine} />
          <Route path="/research/space-agi-lab" component={SpaceAGIEngineeringLab} />
          <Route path="/research/space-agi-roadmap" component={SpaceAGIRoadmap} />
          <Route path="/research/space-agi-math" component={SpaceAGIMathematics} />
          <Route path="/research/math-history" component={MathHistory} />
          <Route path="/research/space-agi-explanation" component={SpaceAGIExplanation} />
          <Route path="/research/agi-asi-framework" component={AGIASIFramework} />
          <Route path="/research/pmp-nmpc-autonomous-control" component={PMPNMPCControlFramework} />
          <Route path="/research/asi-astronaut-mathematics" component={ASIAstronautMathematics} />
          <Route path="/marketing-ai-agent" component={MarketingAIAgent} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/learn/aerospace" component={AerospaceReference} />
          <Route path="/formulas-library" component={FormulaLibrary} />
          <Route path="/satellites" component={RealSatelliteData} />
          <Route path="/learn/orbital-mechanics" component={LearnOrbitalMechanics} />
          <Route path="/learn/space-questions" component={SpaceQuestions} />
          <Route path="/calculators" component={Calculators} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/category/:category" component={BlogCategory} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/recommended-books" component={RecommendedBooks} />
          <Route path="/space-shop" component={SpaceShop} />
          <Route path="/learn/experiments" component={SpaceExperiments} />
          <Route path="/learn/how-gps-works" component={HowGPSWorks} />
          <Route path="/learn/how-nasa-launches-satellite" component={HowNASALaunches} />
          <Route path="/learn/how-spacex-lands-rockets" component={HowSpaceXLands} />
          <Route path="/learn/how-mars-rovers-work" component={HowMarsRovers} />
          <Route path="/learn/how-starlink-works" component={HowStarlinkWorks} />
          <Route path="/learn/how-iss-works" component={HowISSWorks} />
          <Route path="/compare/orbits" component={CompareOrbits} />
          <Route path="/missions" component={MissionList} />
          <Route path="/missions/timeline" component={MissionTimeline} />
          <Route path="/missions/:slug" component={MissionDetail} />
          <Route path="/artifacts" component={BroughtFromSpace} />
          <Route path="/quiz/orbital-mechanics" component={OrbitalMechanicsQuiz} />
          <Route path="/learn/how-solar-system-works" component={HowSolarSystemWorks} />
          <Route path="/learn/what-is-moon" component={WhatIsMoon} />
          <Route path="/learn/lunar-geology" component={LunarGeology} />
          <Route path="/learn/astrophysics" component={Astrophysics} />
          <Route path="/learn/quantum-physics" component={QuantumPhysics} />
          <Route path="/learn/quantum-physics-nasa" component={QuantumPhysicsNASA} />
          <Route path="/learn/aerodynamics" component={Aerodynamics} />
          <Route path="/learn/quantum-space" component={QuantumSpace} />
          <Route path="/ai-in-aerospace" component={AIInAerospace} />
          <Route path="/ai-in-space" component={AIInAerospace} />
          <Route path="/careers" component={SpaceCareers} />
          <Route path="/learn/nasa-study-guide" component={NASAStudyGuide} />
          <Route path="/learn/how-satellites-work" component={HowSatellitesWork} />
          <Route path="/learn/astronomy-for-kids" component={AstronomyForKids} />
          <Route path="/learn/nasa-for-students" component={NASAForStudents} />
          <Route path="/space-news" component={SpaceNews} />
          <Route path="/learn/nasa-for-kids" component={NASAForKids} />
          <Route path="/learn/satellite-tutorial" component={SatelliteTutorial} />
          <Route path="/space-quiz" component={SpaceQuiz} />
          <Route path="/platform-blueprint" component={PlatformBlueprint} />
          <Route path="/astronauts" component={AstronautExplorer} />
          <Route path="/astronauts/:slug" component={AstronautProfile} />
          <Route path="/planets" component={PlanetHub} />
          <Route path="/planets/:slug" component={PlanetDetail} />
          <Route component={NotFound} />
        </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
