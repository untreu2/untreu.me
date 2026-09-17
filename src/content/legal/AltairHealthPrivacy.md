_Prepared 17 September 2026 for the OpenAI release_

This revision takes effect when the matching OpenAI release is made available.
It does not announce that deployment has happened. Earlier releases may use the
providers named in their accepted notices.

This separate Consumer Health Data Privacy Policy explains how **Emir Yorulmaz
(untreu)**, the operator of Altair, handles consumer health data. For privacy,
access, deletion or appeals, email [contact@dame.dev](mailto:contact@dame.dev).
Read it with the [Privacy Policy](/altair/privacy) and
[health notice](/altair/health-notice).

This policy describes Altair's OpenAI release and device-local health profile. Your display
name and profile photo are saved with your account; your health profile and
private history are stored on this iPhone. One shared first-use notice covers AI
processing, selected health context and continuous cloud voice together. This
release changes AI and speech processing to OpenAI and requires a fresh agreement
before first AI or voice use. Earlier server records follow the retention
and deletion description below.

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
  religious beliefs. Units, time zone and week-start preferences personalize
  the on-device presentation and calculations.
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
your health profile and personalization fields, meals and meal photos, reports,
conversation history and response instructions on your iPhone. These profile
fields include age, sex, height, weight, dietary preferences, restrictions,
allergies, units, time zone and week start. They are not synced to your account
for restoration. Local health features work without cloud AI. There are no
background uploads of new health records or full health-history batches in
this release.

Your display name and profile photo are separate: Altair saves them with your
account for restoration on another device. They may contain sensitive details
you choose to include. Account, authentication, subscription, consent and
service-operation records also remain on the server, as described in the
[Privacy Policy](/altair/privacy). Local health-profile storage does not prevent
the temporary, selected AI and voice processing described below or the optional
server notes you deliberately save.

After you agree to the shared first-use notice, requests can share:

- **AI with OpenAI:** your submitted message or photo, relevant conversation
  text, local instructions and enabled server notes pass through Altair's server
  to GPT-5.6 Luna for context selection, replies, photo and meal analysis.
- **Selected health context:** the AI agreement also permits selected summaries
  from local reports, profile or meal records to accompany the AI request.
  Selection follows your question. Raw HealthKit sample timelines and your
  complete health history are not sent. Summaries remain health information;
  reducing their detail does not make them anonymous.
- **Voice with OpenAI:** the shared agreement covers continuous microphone
  audio transmission through Altair to GPT-Live during the active voice session,
  including silence and while the assistant speaks. The transcript participates
  in the delegated Luna AI flow; relevant health context is selected once the
  question is known. Selected context and validated results can return to
  GPT-Live for speech. End voice to stop capture and new transmission.
- **Optional server notes:** notes you explicitly save are stored against your
  account on Altair's server and used in AI requests only when memory and AI
  are enabled. The model cannot automatically save new notes. Notes from earlier
  versions may remain for review and deletion.

There is no independent health-context switch in the current app. Messages and
photos you submit, response instructions and enabled server notes can also
contain health information. You can disable server notes separately. Altair's
server processes new AI and voice request content temporarily and does not
persist these exchanges, attached photos, selected profile values, audio,
reports or the meal journal in its application database. This is separate from
your account profile photo and notes you deliberately save. Provider retention
is separate. The device saves delegated exchanges and resulting journal changes.
Live captions and other GPT-Live speech are not a complete saved session transcript.
A ready voice session counts toward your AI allowance even if silent or handled
locally. Its first delegated reply is included; later delegated replies use
additional allowance. The service records usage counts separately from content.

## Recipients and limits on use

Altair's hosting and database providers carry permitted requests, store your
display name, profile photo, optional notes and account administration records,
and may retain earlier health content until deletion. **OpenAI** provides
GPT-5.6 Luna AI processing and GPT-Live speech. The purposes and categories
shared are described above. If you email us health information in a
privacy or support request, it is also processed to handle that correspondence.

Altair does not sell consumer health data or use it for advertising. There is
no affiliate-sharing integration in the current service. Subscription requests
to Apple and RevenueCat do not include health measurements or conversations.
AI and voice remain unavailable until Altair verifies approved, applicable
OpenAI Zero Data Retention controls for the actual API key and project, with
training and data-sharing opt-ins disabled. This is a deployment requirement;
an app agreement or policy does not configure or establish provider controls.
Altair requests no saved Responses or Live recordings and disables Luna prompt
cache writes. Altair does not persist raw voice recordings on its server.

Request settings alone do not establish Zero Data Retention. OpenAI's standard
API does not train on submitted content unless opted in, but default
abuse-monitoring retention can include content for up to 30 days, subject to
documented exceptions. Approved ZDR has endpoint and feature limitations;
operational and billing metadata can remain. Images flagged for potential child
sexual abuse material may be retained for safety review even with ZDR. These controls do not promise
immediate deletion of all provider data, backups or historical submissions.
See [OpenAI's data controls](https://developers.openai.com/api/docs/guides/your-data).

Regional support must be verified for the actual project, endpoint and other
services; this policy does not guarantee EU-only or end-to-end EU processing.
Changing providers does not delete prior submissions to OpenRouter, Google
Vertex, Microsoft Azure or ElevenLabs.

Processing can occur outside your country. Provider terms, backups and
international-transfer arrangements remain separate from local storage.
Contact [contact@dame.dev](mailto:contact@dame.dev) for the arrangements relevant
to your data, including provider retention and processing locations.

## Consent and withdrawal

Apple Health access is an optional permission controlled by Apple. Before first
AI or voice use, Altair presents one shared notice with policy links. Agreement
covers messages, submitted photos, relevant history, selected health, profile
and meal context, local instructions and enabled server notes processed by AI,
plus continuous active-session audio processing by OpenAI GPT-Live. You can
choose **Not now**. Local reports and manual journal edits remain available
without agreement. Reading a policy or accepting terms does not grant permission.

The app remembers agreement for the account and policy version. Accepting it
does not send a message or start the microphone; you must deliberately request
AI processing or start a call. Voice also requires iOS microphone permission.
There are no in-app controls to turn AI or voice permission off. End an active
call and stop using AI and voice to stop sending new information. For privacy
requests, including withdrawal of recorded consent, email
[contact@dame.dev](mailto:contact@dame.dev). We may verify your account before
updating its recorded choice. Server-side revocation still blocks processing.
Information already sent cannot be recalled. Withdrawal does not automatically
delete saved records or disable local health features.
Consent decisions, disclosure version, revision and times are recorded against
your account. Material changes that require consent prompt a fresh decision.

## Retention, earlier records and deletion

The app refreshes a rolling 90-day Apple Health window to calculate local
summaries. That window is not an expiry policy for saved reports, conversations,
meals or imported history. Those local files have no automatic expiry, are
protected using iOS file protection and are excluded from device backups.
Signing out preserves the account's local health profile, preferences and history
on the same iPhone. Altair does not provide cloud restoration or cross-device
syncing of those records. On a fresh installation or another device, your display
name and profile photo can return, but your local health profile and private
history cannot. Returning accounts skip health setup; you can add local profile
details in Settings. Apple Health data can be read again with permission, but
that does not restore old meals, conversations or other Altair-only records.

Earlier versions stored health records, health profiles, meals, photos, reports
and conversations on Altair's server. The earlier device-local profile update removed saved health-profile and
personalization values from active account profiles; your display name and
profile photo remain. Historical backups and
prior provider submissions have separate deletion processes.

Other earlier health records, meals, reports and conversations are not
automatically transferred or removed when you start the app, agree to processing
or request AI. Legacy transfer routes are retired; historical records do not
block new AI requests. Already-copied device history stays local, and remaining
server data follows account deletion and applicable retention processes.
Contact us for access or deletion requests about older records. Optional server
notes and account administration records remain separately.

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
