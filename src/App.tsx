import { Grid, GridItem, Show } from "@chakra-ui/react";

const App = () => {
  return (
    <Grid
      templateAreas={{
        base: '"nav" "main"', // for small devices; under 1024px
        lg: '"nav nav" "aside main"', // bigger than 1024px
      }}
    >
      <GridItem area={"nav"} bg="coral">
        {" "}
        Nav
      </GridItem>
      <Show above="lg">
        {" "}
        {/*to show it just in large screen lg*/}
        <GridItem area={"aside"} bg="gold">
          {" "}
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg="dodgerblue">
        {" "}
        main
      </GridItem>
    </Grid>
  );
};

export default App;
