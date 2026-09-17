import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Information we collect",
    content: (
      <>
        <p>We may collect information you provide directly, including your name, email address, phone number, appointment preferences, vacancy interests, messages, and information submitted during recruitment or support enquiries.</p>
        <p>When you sign in with Google, we may receive basic account information authorized by you, such as your name, email address, profile image, and a unique account identifier. We do not receive your Google password.</p>
        <p>We may also collect limited technical information automatically, such as browser type, device information, IP address, access times, and basic usage or diagnostic data needed to operate and protect the service.</p>
      </>
    ),
  },
  {
    title: "2. How we use information",
    content: <p>We use information to create and authenticate accounts, manage appointment requests, respond to enquiries, provide recruitment and foreign-employment services, communicate service updates, maintain security, prevent misuse, troubleshoot problems, comply with legal obligations, and improve our website and services.</p>,
  },
  {
    title: "3. Google user data",
    content: (
      <>
        <p>Google account information is used only to authenticate you, identify your account, and provide the features you request. Elladria Lanka does not use Google user data for advertising and does not sell it.</p>
        <p>Our use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.</p>
      </>
    ),
  },
  {
    title: "4. How we share information",
    content: <p>We do not sell or rent personal information. We may share it with authorized Elladria Lanka personnel, service providers that host or support our systems, relevant employers or recruitment partners when necessary to deliver a service you request, and government or regulatory authorities where required by law. Service providers may process information only for the services they provide to us and under appropriate safeguards.</p>,
  },
  {
    title: "5. Data retention and deletion",
    content: <p>We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including providing services, maintaining business and recruitment records, resolving disputes, preventing fraud, and meeting legal or regulatory requirements. You may request access, correction, or deletion of your personal information or connected account data using the contact method below. We may retain information where the law requires or permits us to do so.</p>,
  },
  {
    title: "6. Security and international processing",
    content: <p>We use reasonable administrative, technical, and organizational measures to protect personal information. No internet service is completely secure, so we cannot guarantee absolute security. Because our recruitment services connect Sri Lanka with overseas opportunities, information may be processed in other countries where necessary, subject to applicable safeguards and legal requirements.</p>,
  },
  {
    title: "7. Cookies and third-party services",
    content: <p>We may use essential browser storage or cookies for authentication, preferences, security, and service operation. Our website may link to third-party websites or services. Their privacy practices are governed by their own policies, and we encourage you to review them.</p>,
  },
  {
    title: "8. Your choices and rights",
    content: <p>Depending on applicable law, you may have rights to request access to, correction of, deletion of, or restriction of your personal information, and to withdraw consent where processing relies on consent. You may also disconnect Google access through your Google Account security settings. Disconnecting access does not automatically delete information already retained by Elladria Lanka; please contact us if you also want that information deleted.</p>,
  },
  {
    title: "9. Children’s privacy",
    content: <p>Our services are intended for adults seeking employment or business services and are not directed to children under 18. We do not knowingly collect personal information from children through this website.</p>,
  },
  {
    title: "10. Changes to this policy",
    content: <p>We may update this Privacy Policy to reflect changes in our services, technology, or legal obligations. We will publish the revised policy on this page and update the effective date.</p>,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-background">
      <section className="border-b bg-[hsl(222_55%_14%)] text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ro-yellow">Legal</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">How Elladria Lanka (Private) Limited collects, uses, shares, and protects personal information.</p>
          <p className="mt-4 text-sm text-white/50">Effective date: 17 September 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-10">
          <p className="leading-7 text-muted-foreground">This Privacy Policy applies to the Elladria Lanka website, account sign-in, appointment booking, recruitment enquiries, and related online services operated by Elladria Lanka (Private) Limited (“Elladria Lanka”, “we”, “us”, or “our”). By using our services, you acknowledge the practices described below.</p>
          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="font-display text-xl font-bold text-ro-blue sm:text-2xl">{section.title}</h2>
                <div className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">{section.content}</div>
              </section>
            ))}
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-ro-blue sm:text-2xl">11. Contact us</h2>
              <div className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>For privacy questions or to request access, correction, or deletion, contact Elladria Lanka (Private) Limited through the official contact details in our company profile or submit an appointment request and state that your message concerns privacy.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="/elladria-lanka-company-profile.pdf" target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">View company contact details</a>
                  <Link to="/#book" className="rounded-full border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Contact through the website</Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
