import { Route, Switch } from "wouter";
import { NavigationHeader } from "./components/NavigationHeader";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { PlayLearn } from "./pages/PlayLearn";
import { Simulator } from "./pages/Simulator";
import { LearnNewton } from "./pages/LearnNewton";
import { NewtonFormulas } from "./pages/NewtonFormulas";
import { KidsGuide } from "./pages/KidsGuide";
import { AstroBot } from "./pages/AstroBot";
import { ResearchHub } from "./pages/ResearchHub";
import { AerospaceReference } from "./pages/AerospaceReference";
import { FormulaLibrary } from "./pages/FormulaLibrary";
import { RealSatelliteData } from "./pages/RealSatelliteData";
import { LearnOrbitalMechanics } from "./pages/LearnOrbitalMechanics";
import { SpaceQuestions } from "./pages/SpaceQuestions";
import { Calculators } from "./pages/Calculators";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      <NavigationHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/play" component={PlayLearn} />
          <Route path="/simulator" component={Simulator} />
          <Route path="/learn/newton" component={LearnNewton} />
          <Route path="/learn/formulas" component={NewtonFormulas} />
          <Route path="/guide" component={KidsGuide} />
          <Route path="/astrobot" component={AstroBot} />
          <Route path="/research" component={ResearchHub} />
          <Route path="/learn/aerospace" component={AerospaceReference} />
          <Route path="/formulas-library" component={FormulaLibrary} />
          <Route path="/satellites" component={RealSatelliteData} />
          <Route path="/learn/orbital-mechanics" component={LearnOrbitalMechanics} />
          <Route path="/learn/space-questions" component={SpaceQuestions} />
          <Route path="/calculators" component={Calculators} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
