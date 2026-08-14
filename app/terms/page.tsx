import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — DevTools",
  description: "Terms and conditions for using DevTools online utilities.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Terms of Use</h1>
      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg">Last updated: {new Date().toISOString().split("T")[0]}</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using DevTools, you accept and agree to be bound by these Terms of Use.
            If you do not agree to these terms, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">2. Description of Service</h2>
          <p>
            DevTools provides free online developer utilities. All tools process data in your
            browser. We do not guarantee that the output of any tool is error-free or suitable
            for your specific purpose. You are responsible for verifying the accuracy of results
            before using them in production.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">3. Permitted Use</h2>
          <p>
            You may use DevTools for personal, educational, and commercial purposes. You may not:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Use the site to process illegal, harmful, or malicious content</li>
            <li>Attempt to disrupt the service or gain unauthorized access</li>
            <li>Scrape or automate access in a way that degrades service for others</li>
            <li>Resell or repackage the tools as your own product without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">4. Disclaimer of Warranties</h2>
          <p>
            DevTools is provided "as is" without warranties of any kind, express or implied.
            We do not warrant that the site will be uninterrupted, error-free, or secure.
            Tool outputs may contain errors; always verify results independently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, the operators of DevTools shall not be
            liable for any direct, indirect, incidental, consequential, or punitive damages
            arising from your use of the site or its tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">6. Intellectual Property</h2>
          <p>
            The site design, code, and content are the property of the site operator unless
            otherwise noted. You may not copy or reproduce substantial portions of the site
            without permission. Open-source components are used under their respective licenses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">7. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of the site after changes
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of [YOUR JURISDICTION].
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">9. Contact</h2>
          <p>
            For questions about these terms, please contact the site operator at [YOUR CONTACT EMAIL].
          </p>
        </section>
      </div>
    </div>
  );
}
