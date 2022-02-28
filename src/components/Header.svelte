<script>
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import Button, { Label } from "@smui/button";
    import { Icon } from "@smui/common";
    import { Svg } from "@smui/common/elements";
    import { mdiGithub } from "@mdi/js";
</script>

<div class="header-container">
    <TopAppBar variant="static" color={"primary"}>
        <Row>
            <Section>
                <!-- <a href="/">
                    <img src="images/logo.png" alt="logo" width="220" height="110" />
                </a> -->
            </Section>
            <Section align="end" toolbar>
                <Button touch variant="raised" color="secondary" href="https://github.com/DTxCode/SimplePrivacy">
                    <Icon component={Svg} viewBox="0 0 22 22">
                        <path d={mdiGithub} />
                    </Icon>
                    <Label>Github</Label>
                </Button>
            </Section>
        </Row>
    </TopAppBar>
</div>

<style>
</style>
