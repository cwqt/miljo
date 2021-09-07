import miljø from "./miljø";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  new miljø(app, "graphql");
}
