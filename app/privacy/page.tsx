import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Avorqin",
  description:
    "Learn how Avorqin handles your data and protects your privacy while using our browser-based utility tools.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg">Last updated: August 19, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Overview
          </h2>
          <p>
            Avorqin is committed to protecting your privacy. This policy
            explains how information is handled when you visit Avorqin and use
            our online utility tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Tool Input Data
          </h2>
          <p>
            Most Avorqin tools process the information you enter directly in
            your web browser. For these browser-based tools, input such as
            JSON, Base64 text, URLs, CSV data, HTML, CSS, timestamps, and
            similar content is processed locally on your device rather than
            being sent to Avorqin for processing.
          </p>

          <p className="mt-2">
            Because these tools operate client-side, Avorqin does not receive
            or store the content you enter into them.
          </p>

          <p className="mt-2">
            If Avorqin introduces tools in the future that require server-side
            or third-party processing, those tools may operate differently.
            We will provide appropriate information about that processing when
            applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Analytics
          </h2>
          <p>
            We may use privacy-focused analytics to understand site traffic,
            which tools are useful to visitors, and how the website performs.
            Analytics information may include:
          </p>

          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Pages and URLs visited</li>
            <li>Referring website or domain</li>
            <li>Browser and device information</li>
            <li>Approximate geographic information</li>
            <li>Basic website performance and traffic information</li>
          </ul>

          <p className="mt-2">
            Analytics are not intended to collect the content you enter into
            Avorqin&apos;s browser-based utility tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Cookies and Local Storage
          </h2>
          <p>
            Avorqin may use cookies or browser storage when necessary to
            provide site functionality and remember preferences. For example,
            Avorqin currently uses browser storage to remember your selected
            light or dark theme.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Advertising
          </h2>
          <p>
            Avorqin may introduce advertising or other forms of monetization
            in the future. If third-party advertising services are added,
            this privacy policy may be updated to explain any additional data
            practices that apply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Third-Party Services
          </h2>
          <p>
            Avorqin uses third-party infrastructure and service providers,
            including Cloudflare, to host, deliver, secure, and operate the
            website. These providers may process standard technical
            information such as IP addresses, user-agent information,
            requested URLs, and security-related request data as part of
            providing their services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Data Retention
          </h2>
          <p>
            Content processed entirely within browser-based Avorqin tools is
            not retained by Avorqin because that content is not transmitted
            to our servers for processing. Other technical or analytics data,
            if collected, may be retained as necessary for security,
            operations, analytics, and website improvement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Your Rights
          </h2>
          <p>
            Depending on your location, applicable privacy laws may provide
            rights relating to personal information, such as rights to
            request access, correction, or deletion. The availability and
            scope of these rights depend on applicable law and the
            information involved.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Children&apos;s Privacy
          </h2>
          <p>
            Avorqin is a general-purpose utility website and is not designed
            specifically for children. We do not knowingly request personal
            information from children through our browser-based utility
            tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy as Avorqin evolves or as our
            practices change. Updates will be posted on this page with a
            revised &quot;Last updated&quot; date.
          </p>
        </section>
      </div>
    </div>
  );
}