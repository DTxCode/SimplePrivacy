<!-- Wrapper component that allows for setting context variables  -->
<script>
    import { setContext } from "svelte";

    export let component;
    export let contextPairs;

    contextPairs.forEach((element) => {
        const contextKey = element["contextKey"];
        const contextValue = element["contextValue"];

        setContext(contextKey, contextValue);
    });
</script>

<svelte:component this={component} />
