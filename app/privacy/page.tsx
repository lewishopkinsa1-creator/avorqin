import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — DevTools",
  description: "How DevTools handles your data. All tool processing happens in your browser.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>
      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg">Last updated: {new Date().toISOString().split("T")[0]}</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
          <p>
            DevTools is committed to privacy. This policy explains what data we collect,
            how we use it, and what happens to the information you enter into our tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Tool Input Data</h2>
          <p>
            <strong>All tool processing happens entirely in your web browser.</strong> When you paste
            JSON, Base64 text, URLs, CSV data, HTML, CSS, or timestamps into any of our tools,
            that data is processed locally on your device using JavaScript. It is never uploaded
            to our servers.
          </p>
          <p className="mt-2">
            Because processing is client-side, we cannot see, store, or log the content you enter.
            Your data remains under your control at all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Analytics</h2>
          <p>
            We may use privacy-friendly analytics to understand which tools are popular and
            how visitors navigate the site. If enabled, these analytics collect only:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Page URLs visited</li>
            <li>Referrer domain (where you came from)</li>
            <li>Browser type and screen size</li>
            <li>Country (derived from IP address, then discarded)</li>
          </ul>
          <p className="mt-2">
            Analytics do <strong>not</strong> collect the text, JSON, CSV, URLs, or any other
            content you enter into the tools. We do not use Google Analytics or other
            tracking services that share data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Cookies</h2>
          <p>
            This site does not use cookies for tracking or advertising. Any cookies set are
            strictly functional (for example, to remember your theme preference if we add
            dark mode in the future).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Advertising</h2>
          <p>
            We do not display third-party advertisements. If we introduce advertising in the
            future, this policy will be updated and you will be notified.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Third-Party Services</h2>
          <p>
            This site is hosted on a static hosting provider [YOUR HOSTING PROVIDER]. These providers may log standard HTTP request data such as IP address,
            user agent, and requested URL for security and operational purposes. We do not
            control these logs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Data Retention</h2>
          <p>
            Because tool inputs are not transmitted to our servers, we retain none of your
            tool data. Analytics data, if collected, is retained only as long as necessary
            to understand site usage patterns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, or delete
            personal data. Since we do not collect personal data through our tools, these
            rights are generally not applicable to tool usage. For analytics-related requests,
            contact us using the information below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
          <p>
            For privacy questions or concerns, please contact the site operator at [YOUR CONTACT EMAIL].
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on
            this page with an updated date.
          </p>
        </section>
      </div>
    </div>
  );
}
