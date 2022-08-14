<script>
    import Paper, { Title, Content } from "@smui/paper";

    const elevation = 10;
    const sectionPadding = 40;
    const subPadding = 20;
    const contact = "aGVscC5zaW1wbGVwcml2YWN5QGdtYWlsLmNvbQ==";

    function atob_wrapper(text) {
        return atob(text);
    }
</script>

<div class="about-wrapper">
    <div class="paper-wrapper">
        <Paper {elevation} style="padding: {sectionPadding}px; margin-top: {subPadding}px;">
            <Title>About</Title>
            <Content>
                SimplePrivacy provides an easy way for you to password-protect your files. If you'd like to lock a
                folder, please zip it first and then password-protect the zip file.
            </Content>
        </Paper>

        <Paper {elevation} style="padding: {sectionPadding}px; margin-top: {subPadding}px;">
            <Title>Security</Title>
            <Content>
                SimplePrivacy protects your files using a mechanism called the Advanced Encryption Standard (AES-256),
                one of the most widely used encryption specifications in the world.
            </Content>
            <Content>
                <blockquote>
                    "All data stored in Google Cloud is encrypted at the storage level using AES256..." (<a
                        href="https://cloud.google.com/docs/security/encryption/default-encryption">Google</a
                    >)
                </blockquote>
            </Content>
            <Content>
                <blockquote>
                    "Amazon S3 server-side encryption uses one of the strongest block ciphers available to encrypt your
                    data, 256-bit Advanced Encryption Standard (AES-256)." (<a
                        href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html"
                    >
                        Amazon</a
                    >)
                </blockquote>
            </Content>
            <Content>
                <blockquote>
                    "With Office 365, your data is encrypted at rest and in transit, using several strong encryption
                    protocols, and technologies that include ... Advanced Encryption Standard (AES)." (<a
                        href="https://docs.microsoft.com/en-us/microsoft-365/compliance/encryption?view=o365-worldwide#what-is-encryption-and-how-does-it-work-in-office-365"
                    >
                        Microsoft</a
                    >)
                </blockquote>
            </Content>
            <Content>
                <blockquote>
                    "The use of AES is ubiquitous, and the algorithm enjoys strong support in the cryptographic
                    community. Examples of protocols and applications that make use of AES are Transport Layer Security
                    (TLS), which is used by virtually all web browsers; ... and the Personal Identity Verification (PIV)
                    used across the US Federal Government." (<a
                        href="https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8319.pdf"
                    >
                        US National Institute of Standards and Technology</a
                    >)
                </blockquote>
            </Content>
            <Content>
                While AES itself is considered very secure, the strength of its protection is still dependent on the
                password you use. Longer and more random passwords are harded to guess and will provide you with better
                security. For help choosing a password, see
                <a href="https://support.google.com/accounts/answer/32040?hl=en">Google's recommendations</a>.
            </Content>
        </Paper>

        <Paper {elevation} style="padding: {sectionPadding}px; margin-top: {subPadding}px;">
            <Title>Privacy</Title>
            <Content>
                <b>
                    The names and contents of the files you process with this tool are not recorded, uploaded, or shared
                    with anyone.
                </b>
                The source code of this site is available for verification on
                <a href="https://github.com/DTxCode/SimplePrivacy">Github</a>.
            </Content>
        </Paper>

        <Paper {elevation} style="padding: {sectionPadding}px; margin-top: {subPadding}px;">
            <Title>Risks</Title>

            <Content>
                Your use of SimplePrivacy's file-locking tool implies that you understand the limitations of the
                encryption mechanism. SimplePrivacy's authors follow industry standards in the development and
                maintainence of this website, but they cannot guarantee that a locked file will never be unlocked by an
                unauthorized party.
            </Content>
            <br />
            <Content>
                Files that are locked with weak passwords
                <a
                    href="https://www.cnbc.com/2022/03/20/study-if-your-passwords-are-less-than-8-characters-long-change-them.html"
                >
                    are trivial to unlock
                </a>
                by a knowledgeable adversary. Even files that are locked with strong passwords may be unlocked if the attacker
                is able to try lots of different passwords very quickly.
            </Content>
            <br />
            <Content>
                Nevertheless, in most cases locking a file with this tool before sending it over email or uploading it
                to a cloud storage service still offers significant protection from unauthorized access.
            </Content>
        </Paper>

        <Paper {elevation} style="padding: {sectionPadding}px; margin-top: {subPadding}px;">
            <Title>Contact</Title>

            <Content>
                If you have questions or comments, please contact us at <b>{atob_wrapper(contact)}</b>. If you'd like to
                review or contribute to the code, please see our
                <a href="https://github.com/DTxCode/SimplePrivacy">Github page</a>.
            </Content>
        </Paper>
    </div>
</div>

<style>
    .about-wrapper {
        width: 100%;
        padding-top: 2em;
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

    blockquote {
        margin-left: 1em;
        margin-right: 1em;
    }
</style>
