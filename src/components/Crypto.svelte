<script>
    import Input from "./crypto/Input.svelte";
    import Password from "./crypto/Password.svelte";
    import Save from "./crypto/Save.svelte";

    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Paper, { Content } from "@smui/paper";

    const smallSpan = { desktop: 1, tablet: 1, phone: 1 };
    const largeSpan = { desktop: 11, tablet: 7, phone: 3 };

    let inputComponent;
    let passwordComponent;
    let downloadComponent;

    let inputData = [];
    let inputFileName = "";
    let lock = true;
    let password = "";

    function handleClear() {
        inputComponent.clear();
        passwordComponent.clear();
        downloadComponent.clear();
    }
</script>

<div class="crypto-wrapper">
    <div class="paper-wrapper">
        <Paper elevation={10}>
            <Content>
                <LayoutGrid style="padding: 5px 20px;">
                    <Cell spanDevices={smallSpan}>
                        <h2>1</h2>
                    </Cell>
                    <Cell spanDevices={largeSpan}>
                        <Input
                            bind:this={inputComponent}
                            bind:data={inputData}
                            bind:fileName={inputFileName}
                            bind:lock
                            on:clear={handleClear}
                        />
                    </Cell>
                    <Cell spanDevices={smallSpan}>
                        <h2>2</h2>
                    </Cell>
                    <Cell spanDevices={largeSpan}>
                        <Password bind:this={passwordComponent} bind:password bind:lock />
                    </Cell>

                    <Cell spanDevices={smallSpan}>
                        <h2>3</h2>
                    </Cell>
                    <Cell spanDevices={largeSpan}>
                        <Save bind:this={downloadComponent} bind:inputData bind:inputFileName bind:lock bind:password />
                    </Cell>
                </LayoutGrid>
            </Content>
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
        width: 75%;
    }

    @media (max-width: 600px) {
        .paper-wrapper {
            width: 95%;
        }
    }

    h2 {
        margin-top: 5px;
        text-align: center;
        font-size: 4em;
    }
</style>
