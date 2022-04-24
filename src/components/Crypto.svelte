<script>
    import Input from "./crypto/Input.svelte";
    import Password from "./crypto/Password.svelte";
    import Option from "./crypto/Option.svelte";
    import Save from "./crypto/Save.svelte";

    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Paper, { Content as PaperContent } from "@smui/paper";

    export let log;

    let inputComponent;
    let optionComponent;
    let passwordComponent;
    let downloadComponent;

    let inputData = [];
    let inputFileName = "";
    let lock = true;
    let password = "";

    function handleClear() {
        inputComponent.clear();
        optionComponent.clear();
        passwordComponent.clear();
        downloadComponent.clear();
    }
</script>

<div class="crypto-wrapper">
    <div class="paper-wrapper">
        <Paper>
            <PaperContent>
                <LayoutGrid style="padding: 0px 25px;">
                    <Cell span={1}>
                        <h2>1</h2>
                    </Cell>
                    <Cell span={11}>
                        <div>
                            <Input
                                bind:this={inputComponent}
                                bind:data={inputData}
                                bind:fileName={inputFileName}
                                on:clear={handleClear}
                            />
                        </div>
                    </Cell>
                    <Cell span={1}>
                        <h2>2</h2>
                    </Cell>
                    <Cell span={11}>
                        <div>
                            <Option bind:this={optionComponent} bind:lock />
                        </div>
                    </Cell>
                    <Cell span={1}>
                        <h2>3</h2>
                    </Cell>
                    <Cell span={11}>
                        <Password bind:this={passwordComponent} bind:password bind:lock />
                    </Cell>
                    <Cell span={1}>
                        <h2>4</h2>
                    </Cell>
                    <Cell span={11}>
                        <Save
                            bind:this={downloadComponent}
                            bind:log
                            bind:inputData
                            bind:inputFileName
                            bind:lock
                            bind:password
                        />
                    </Cell>
                </LayoutGrid>
            </PaperContent>
        </Paper>
    </div>
</div>

<style>
    .crypto-wrapper {
        width: 100%;
        margin: 0px;
    }

    .paper-wrapper {
        margin: 20px auto;
        width: 70%;
    }
</style>
