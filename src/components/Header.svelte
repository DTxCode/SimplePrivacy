<script>
    import TopAppBar, { Row, Section } from "@smui/top-app-bar";
    import Button, { Label } from "@smui/button";
    import { Icon } from "@smui/common";
    import { Svg } from "@smui/common/elements";
    import { mdiGithub } from "@mdi/js";
</script>

<div class="header-container">
    <TopAppBar variant="static" color={"secondary"}>
        <Row>
            <Section />
            <Section align="end" toolbar>
                <Button touch variant="raised" href="https://github.com/DTxCode/SimplePrivacy">
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
