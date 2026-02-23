import { Route, Switch } from "wouter";
import { NavigationHeader } from "./components/NavigationHeader";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";
import { LocaleRedirect } from "./components/LocaleRedirect";
import { LocaleRouter } from "./components/LocaleRouter";
import { NotFound } from "./pages/NotFound";
function App() {
  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      <SEOHead />
      <NavigationHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1">
        <Switch>
          <Route path="/" component={LocaleRedirect} />
          <Route path="/:locale/:rest*">
            {(params) => <LocaleRouter locale={params?.locale || "en"} rest={params?.rest || ""} />}
          </Route>
          <Route path="/:locale">
            {(params) => <LocaleRouter locale={params?.locale || "en"} rest="" />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
