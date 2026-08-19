import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Avorqin",
  description:
    "Terms and conditions for using Avorqin's browser-based utility tools and services.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Terms of Use
      </h1>

      <div className="space-y-8 text-muted-foreground">
        <p className="text-lg">Last updated: August 19, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Avorqin, you agree to these Terms of Use. If
            you do not agree to these terms, please do not use the site or its
            tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            2. Description of Service
          </h2>
          <p>
            Avorqin provides online utility tools for developers and other
            users. Most current tools perform their primary processing
            directly in your web browser. Some current or future features may
            rely on third-party services, external resources, or server-side
            processing where necessary to provide their functionality.
          </p>

          <p className="mt-2">
            Avorqin does not guarantee that the output of any tool is
            error-free, complete, or suitable for a particular purpose. You
            are responsible for reviewing and verifying results before relying
            on them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            3. Permitted Use
          </h2>
          <p>
            You may use Avorqin for lawful personal, educational, development,
            and commercial purposes. You may not:
          </p>

          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>
              Use the site or its tools for unlawful, harmful, fraudulent, or
              malicious activity
            </li>
            <li>
              Attempt to disrupt, damage, overload, or interfere with the
              operation or security of the service
            </li>
            <li>
              Attempt to gain unauthorized access to systems, accounts, data,
              or infrastructure
            </li>
            <li>
              Use automated access in a manner that materially degrades the
              service for other users
            </li>
            <li>
              Misrepresent Avorqin&apos;s tools, branding, or content as your
              own service without permission
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            4. Tool Results and User Responsibility
          </h2>
          <p>
            Avorqin&apos;s tools are provided for convenience and informational
            purposes. Results may contain errors or may not account for every
            circumstance. You are responsible for determining whether a
            result is accurate and appropriate for your intended use.
          </p>

          <p className="mt-2">
            You should independently verify important results before using
            them in production systems, financial decisions, security
            configurations, legal matters, or other situations where an error
            could cause significant harm or loss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            5. Disclaimer of Warranties
          </h2>
          <p>
            To the extent permitted by applicable law, Avorqin and its tools
            are provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, whether express or implied.
          </p>

          <p className="mt-2">
            We do not warrant that the website or its tools will always be
            available, uninterrupted, secure, accurate, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Avorqin and its
            operator will not be liable for indirect, incidental, special,
            consequential, or punitive damages arising from or related to your
            use of, or inability to use, the site or its tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            7. Intellectual Property
          </h2>
          <p>
            Unless otherwise indicated, the Avorqin name, site design, original
            content, and original site code are owned by or licensed to the
            site operator. Third-party software, libraries, trademarks, and
            other materials remain subject to their respective licenses and
            ownership rights.
          </p>

          <p className="mt-2">
            You may not reproduce or redistribute substantial portions of the
            Avorqin website or present Avorqin&apos;s original content or tools
            as your own without permission, except where applicable law or an
            applicable license permits it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            8. Third-Party Services
          </h2>
          <p>
            Avorqin may rely on third-party infrastructure, libraries,
            services, APIs, or external resources. We are not responsible for
            the availability, accuracy, security, or practices of independent
            third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            9. Changes to the Service
          </h2>
          <p>
            We may add, modify, suspend, or discontinue tools, features, or
            other parts of Avorqin at any time. We may also introduce usage
            limits, paid features, advertising, or other changes as the
            service evolves.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            10. Changes to These Terms
          </h2>
          <p>
            We may update these Terms of Use from time to time. Changes will
            be posted on this page with a revised &quot;Last updated&quot;
            date. Your continued use of Avorqin after updated terms become
            effective constitutes acceptance of those terms to the extent
            permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            11. Governing Law
          </h2>
          <p>
            These Terms of Use are governed by applicable law. Any rights or
            obligations that cannot lawfully be limited by these terms remain
            unaffected.
          </p>
        </section>
      </div>
    </div>
  );
}