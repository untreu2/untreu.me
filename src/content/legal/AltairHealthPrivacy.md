_Last updated 15 September 2026_

This separate Consumer Health Data Privacy Policy explains how **Emir Yorulmaz
(untreu)**, the operator of Altair, handles consumer health data. For privacy,
access, deletion or appeals, email [contact@dame.dev](mailto:contact@dame.dev).
Read it with the [Privacy Policy](/altair/privacy) and
[health notice](/altair/health-notice).

The local storage described here applies to Altair's local-data release, whose
privacy choices include **Use cloud AI** and **Include health context with AI**.
Older server records remain subject to the transition described below until
migration or deletion is complete.

## Categories, sources and purposes

- **Health and fitness readings:** activity, energy, exercise, heart and
  respiratory readings, other permitted vitals, body measurements, mobility,
  hearing-related measurements, nutrition, sleep, workouts, medication-related
  measurements such as insulin delivery and inhaler use, alcohol-related
  readings, and falls. These come from
  the Apple Health categories you authorize, which may originate from your
  iPhone, Apple Watch, connected apps or devices. Altair uses readable records
  to calculate local summaries, reports and scores.
- **Health profile and diet:** age, sex, height, weight, dietary preferences,
  restrictions, allergies, meal descriptions and photos, eating times and
  estimated nutrients. These come from information you provide and Altair's
  calculations or AI estimates. They support personal context and your meal
  journal. Some preferences may reveal other sensitive information, including
  religious beliefs.
- **Health communications:** information in messages, submitted photos, voice
  audio, transcripts, response instructions and optional server notes. These
  come from you and the replies generated for your requests. They support
  conversations, meal analysis, transcription and speech.
- **Derived information and identifiers:** summaries, scores, nutrition
  estimates and other inferences associated with dates and, where information
  reaches the service, your account and request identifiers. They support the
  requested wellness features and operation of your account.

Altair does not read workout routes or precise location from Apple Health and
does not write records back to Apple Health. Available information depends on
your permissions, recorded measurements and what you choose to provide.

## On-device storage and selected sharing

Raw records remain in Apple Health. Altair calculates and saves health summaries,
profile information, meals and photos, reports, conversation history and
response instructions on your iPhone. Local health features work without cloud
AI. There are no background uploads of new health records or full health-history
batches in this release.

You can choose to share information for a particular cloud feature:

- **AI with OpenRouter and Google Vertex:** your submitted message or photo,
  relevant conversation text, local instructions and enabled server notes pass
  through Altair's server to these providers for replies and meal analysis.
- **Additional health context:** a separate choice permits selected summaries
  from local reports, profile or meal records to accompany the AI request.
  Selection follows your question. Raw HealthKit sample timelines and your
  complete health history are not sent. Summaries remain health information;
  reducing their detail does not make them anonymous.
- **Voice with ElevenLabs:** a separate voice choice permits microphone audio
  to be sent for transcription and AI reply text to be sent for speech. The
  transcript also participates in the AI flow. Health context is selected after
  transcription, when the question is known.
- **Optional server notes:** notes you explicitly save are stored against your
  account on Altair's server and used in AI requests only when memory and AI
  are enabled. The model cannot automatically save new notes. Notes from earlier
  versions may remain for review and deletion.

Turning additional health context off does not remove health information you
deliberately type or photograph, your response instructions or enabled server
notes from an otherwise permitted AI request. You can disable server notes
separately. The server processes new AI and voice request content temporarily;
it does not persist the exchanges, photos, audio, reports or meal journal in its
application database. The device saves your resulting conversation and journal.

## Recipients and limits on use

Altair's hosting and database providers carry permitted requests, store optional
notes and account administration records, and hold earlier health content while
migration is pending. **OpenRouter and Google Vertex** provide AI processing;
**ElevenLabs** provides transcription and speech. Their purposes and the
categories shared are described above. If you email us health information in a
privacy or support request, it is also processed to handle that correspondence.

Altair does not sell consumer health data or use it for advertising. There is
no affiliate-sharing integration in the current service. Subscription requests
to Apple and RevenueCat do not include health measurements or conversations.
Our requirements for AI and voice processors limit submitted content to the
requested service, exclude advertising and independent model training, and
require protection consistent with our privacy policy. AI and voice remain
unavailable when required provider privacy verification is incomplete.

Processing can occur outside your country. AI routing requests no-training and
zero-retention handling, but request controls do not erase prior submissions
or establish the retention of every vendor record. Provider terms, backup
lifecycles and international-transfer arrangements remain separate from local
storage. Contact [contact@dame.dev](mailto:contact@dame.dev) for information about
the recipients and arrangements relevant to your data.

## Consent and withdrawal

Apple Health access is an optional permission controlled by Apple. Cloud AI,
additional health context and ElevenLabs voice have separate choices within
Altair. Cloud choices start off when a new decision is required. Voice requires
AI permission; additional structured health context requires its own permission
in addition to AI. Local reports and manual journal edits work with all cloud
choices off. Reading a policy or accepting terms does not grant permission.

Use **Settings → Data & privacy → Privacy & health → Change privacy choices**
to withdraw a choice. Altair blocks new processing for that purpose and
interrupts active requests. It cannot recall information already transmitted.
Withdrawal does not automatically delete saved records. Your decisions,
disclosure version, revision and times are recorded against your account to
enforce your choices. Material changes that require consent prompt a fresh
decision.

## Retention, earlier records and deletion

The app refreshes a rolling 90-day Apple Health window to calculate local
summaries. That window is not an expiry policy for saved reports, conversations,
meals or imported history. Those local files have no automatic expiry, are
protected using iOS file protection and are excluded from device backups.
Signing out preserves the account's local history on the same iPhone; Altair
does not provide cloud restoration or cross-device history syncing.

Earlier versions stored health records, profiles, meals, photos, reports and
conversations on Altair's server. The local-data release downloads and verifies
a complete copy before confirming removal of the corresponding server records.
The service removes those records only after validating the confirmation.
Interrupted migrations can be retried; server removal may already have finished
if the confirmation response was interrupted, while the verified iPhone copy
remains available. The app shows pending migration and blocks AI for that
account until it finishes.
Optional server notes and account administration records remain separately.

You can delete meals and conversations locally and inspect, disable or delete
server notes in Settings. Disabling notes stops their use but does not delete
them. Revoking Apple Health access stops future reads; it does not erase saved
reports or replies derived from earlier readings.

In-app account deletion removes active Altair account data and the current
iPhone's account files and starts Firebase identity deletion, which is retried
if needed. Minimal hashed deletion markers and audit records remain to prevent
account recreation from old credentials. Deleting an account does not erase
Apple Health originals, cancel an Apple subscription, immediately erase another
offline device's files, or guarantee immediate erasure from provider systems
and backups. See the [Privacy Policy](/altair/privacy) for these distinctions.

## Exercising your rights

Depending on applicable law, you may have rights to confirm collection, access
health data and information about recipients, correct data, receive a portable
copy, withdraw consent and request deletion, including downstream deletion
where required. Email [contact@dame.dev](mailto:contact@dame.dev) and explain your
request. We may ask for information needed to verify your account and authority.
Do not include passwords, verification codes or full health records in the
first email.

If you disagree with a response, reply to the same address with **Privacy
appeal** and explain what you want reviewed. You may also contact the relevant
privacy regulator or attorney general where applicable. Do not post health
information in public GitHub issues or social posts.

Altair is intended for adults aged 18 and over. Report suspected underage data
submission to [contact@dame.dev](mailto:contact@dame.dev).
