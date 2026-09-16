_Last updated 16 September 2026_

Altair is a general wellness app operated by **Emir Yorulmaz (untreu)**. This
policy explains how the iOS app and its supporting services handle personal
information. For privacy, access or deletion requests, contact
[contact@dame.dev](mailto:contact@dame.dev).

This policy describes Altair's device-local health profile release. Your display
name and profile photo can be restored from your account; your health profile
and private history cannot. A first-use notice asks for agreement to AI
processing and selected health context together; voice has an additional notice.
Local storage does not prevent the selected, temporary processing described
below. Records from earlier versions follow **Records from earlier versions**.

Altair's scores, nutrition estimates and AI replies are informational. They do
not provide medical advice, diagnosis or treatment. Read the separate
[Consumer Health Data Privacy Policy](/altair/health-privacy) and
[health notice](/altair/health-notice). Reading a policy or accepting the Terms
of Use does not give permission to share information with AI or voice providers.

## Information stored on your iPhone

- **Apple Health information.** With Apple's separate permission, Altair reads
  the categories you allow and calculates daily summaries on your device. Raw
  records remain in Apple Health. Altair does not upload raw HealthKit records
  or send background health batches to its server.
- **Health profile and preferences.** Age, sex, height, weight, dietary
  preferences, restrictions and allergies are stored on this iPhone, together
  with your units, time zone and week-start preferences. Altair does not sync
  these profile fields or preferences to your account for restoration.
- **Meal journal.** Meal descriptions and photos, eating times and nutrition
  estimates are stored locally. Profile photos are handled separately below.
- **Reports and conversations.** Calculated reports and scores, chat history,
  voice transcripts, and your response instructions are stored locally. Some
  saved content may contain health information or other sensitive details.

These records support your wellness history, reports, journal and conversations.
Local health features and manual edits work without cloud-AI permission. The app
uses iOS file protection for its private files and excludes them from device
backups. Altair does not provide cloud restoration or cross-device syncing of
this health profile, preferences or private history. Deleting the app, a fresh
installation or changing devices starts with new local data. Your display name
and profile photo can return when you sign in, but Altair cannot recover the
other local records. Returning accounts skip health setup; you can add local
profile details in Settings. With your permission, available Apple Health
information can be read again. That does not restore old meals, conversations,
response instructions or other Altair-only history.

## Information Altair's services retain

- **Display name and profile photo:** the name and photo you choose are saved
  with your account so they can be restored on a new installation or device.
  A photo or name you supply can itself contain sensitive information. This
  account sync does not include your health profile or personalization fields.
- **Account and authentication information:** account identifiers, email when
  supplied by authentication, verification status, adult confirmation status,
  and related account metadata. Firebase handles phone
  verification and may retain your
  full phone number. Altair's user record stores a keyed phone fingerprint, the
  last four digits and a verification time instead of the full number.
- **Subscriptions and operation:** purchase and entitlement information, usage
  counters, device registrations, app versions, push tokens, notification
  preferences and operational request metadata. These support authentication,
  subscriptions, security and service operation. Apple handles payments;
  Altair does not receive your payment card number.
- **Privacy choices:** your consent decisions, disclosure version, revision and
  decision times, including changes. These let the service enforce your choices.
- **Optional assistant notes:** notes you deliberately save in **Settings →
  Data & privacy → Assistant memory**. These are an explicit exception to local
  storage and may contain personal or health information. New notes are not
  created automatically by the AI. Notes from earlier versions may remain
  available for you to review and delete.
- **Requests you send us:** your contact details and correspondence when you
  email support or exercise a privacy right.

Altair's hosting and database providers process this information to operate
the service. They also carry the temporary AI and voice requests described
below and may retain older records as described under **Records from earlier versions**.

## Optional AI processing

Before using cloud AI, Altair asks for your permission. When you submit a
request, your message, deliberately attached photos, relevant conversation
text, local response instructions and enabled server notes pass through
Altair's server to **OpenRouter and Google Vertex**, which provide the AI
response. Meal analysis also uses this flow. A message or photo can contain
health information even when it did not come from Apple Health.

The AI notice also covers selected health context. Altair uses your question to
select relevant summaries from your on-device health reports, profile or meal
journal and relevant conversation history. Only that selected context is sent
for the request; raw HealthKit sample timelines and the complete health history
are not sent. Summaries remain sensitive health information and are not
necessarily anonymous. The current app does not offer an independent switch to
use AI while excluding health context.

Your agreement is remembered for this account on this device. Agreeing does not
send a message; processing starts when you request an AI reply or meal analysis.
You can choose **Not now** and continue using local wellness features.

The local-data service processes these requests temporarily and does not save
their messages, attached photos, selected profile values, summaries or replies
in Altair's application database. This is separate from storing the profile
photo you choose for your account and any notes you explicitly save.
Conversation history and resulting meal changes are saved on your device.

## Optional voice processing

Voice requires its own first-use agreement in addition to the AI agreement. Microphone
audio passes through Altair's server to **ElevenLabs** for transcription. The
transcript is used to select context and obtain the AI response. ElevenLabs also
receives reply text to generate speech. Audio, transcripts and spoken replies
can contain health information.

Altair does not save raw voice recordings in its application database. The
conversation transcript is retained locally on your iPhone. Microphone access
is also controlled by iOS; you can use text without granting voice permission.

## Other providers and processing safeguards

- **Apple** provides Apple Health permissions, App Store purchases and push
  delivery, and controls the original records in Apple Health.
- **Firebase (Google)** provides authentication, phone verification and account
  management.
- **RevenueCat** manages subscription entitlements using your account identifier
  and purchase information. Health measurements and conversation content are
  not included in Altair's subscription requests.
- **OpenRouter, Google Vertex and ElevenLabs** process the selected information
  described above to provide the features you request.

Altair does not sell personal or consumer health data or use it for advertising.
The model requests sent through OpenRouter use the configured Google Vertex EU
route with zero-retention and denied data-collection request settings, without
fallback to another route. Model requests are unavailable while the server's
model-provider privacy confirmation is off. These request settings do not by
themselves verify every provider account setting, contract or historical record.

ElevenLabs speech uses standard processing and may retain submitted audio and
reply text under its applicable service terms. The model's zero-retention
settings do not apply to speech, and the current app does not have a separate
ElevenLabs privacy-readiness gate. ElevenLabs provides account-level model
improvement controls; their application depends on the production account's
settings and terms. This policy does not represent all voice processing as
zero-retention or make an unverified promise that every speech submission is
excluded from provider training. Contact us for the arrangements applying to
your data before choosing voice.

Providers can process information outside your country. Retention, processing
locations and international-transfer arrangements depend on the service and
applicable terms. Contact [contact@dame.dev](mailto:contact@dame.dev) for
information about the providers and arrangements relevant to your request.

Connections to Altair's production service use HTTPS. Cloud AI and voice
processors need to read the submitted information to provide their services;
these features are not end-to-end encrypted between only your devices.

## Retention and deletion

**Local profile and history.** Altair refreshes a rolling 90-day window of
readable Apple Health records to rebuild local summaries. This is a calculation
window, not an overall 90-day deletion policy. Saved reports, conversations, meals and
imported history have no automatic expiry. Signing out leaves the local health
profile, preferences and private history on the same iPhone for that account.
Deleting a meal or conversation removes that item from the local journal or
history. Previously saved reports and
replies may still contain information derived from it.

**Name, profile photo, notes and account records.** Your display name and profile
photo remain with the account until changed, removed where supported, or deleted
with the account. Notes remain until you delete them or delete your account.
Disabling memory stops its use for AI but does not delete
the notes. Account, subscription, usage, device and consent records are retained
to operate your account until deletion, subject to the exceptions below.
Support correspondence is retained as needed to handle the request and related
legal obligations.

**Account deletion.** Use **Settings → Account** to delete your Altair account.
This removes active Altair account data and the current iPhone's account files
and starts deletion of the Firebase identity. Identity deletion is retried if
it fails. Minimal hashed deletion markers and deletion audit records remain to
prevent an erased account from being recreated by an old credential. Deletion
on one iPhone cannot immediately erase private files on another offline device.

Deleting your Altair account does not erase original Apple Health records,
cancel an App Store subscription or automatically erase records held separately
by Apple, RevenueCat or other providers. Backups and provider records have
separate retention and deletion processes; an active-database deletion is not a
promise of immediate erasure from every backup or third-party system. Contact
us about those records or to make a deletion request.

## Records from earlier versions

Earlier Altair versions stored account-linked health records, health profiles,
meals, photos, reports and conversations on the server. The server update for
this release removes previously saved health-profile and personalization values
from active account profiles, while preserving your display name and profile
photo. This removal does not erase those values from historical backups or
previous provider submissions.

Other earlier health records, meals, reports and conversations are not
automatically transferred or deleted when you open the app, accept a notice or
use AI. Legacy transfer routes are retired, and historical records do not gate
new AI requests. Any already-copied device history remains local; remaining
server records are subject to account deletion and applicable retention
processes. Contact us about access to or deletion of earlier records. Historical
backups and prior provider submissions have separate retention processes.

## Your choices and privacy requests

- Review the AI/health-context notice before first use and the additional voice
  notice before voice use. Choose **Not now** to decline. An agreement is
  remembered; accepting it does not itself send a message or start recording.
- The current app has no editable cloud-consent switches. To stop sending new
  information, stop using AI and voice. To request withdrawal of recorded cloud
  permission, email [contact@dame.dev](mailto:contact@dame.dev). This is a support
  request, not an instant in-app switch. We may verify your account before
  updating the server decision. Existing transmitted information cannot be
  recalled, and withdrawal does not automatically delete saved records.
- Review or revoke Apple Health access in the Health app's access settings.
  Revocation stops future reads; it does not erase saved reports or discussions.
- Review, disable or delete notes in **Settings → Data & privacy → Assistant
  memory**. Edit or delete meals in **Diet**, and delete conversations from
  conversation history.
- Manage or cancel subscriptions through the App Store.

Depending on applicable law, you may request access, correction, a portable
copy or deletion, withdraw consent, restrict or object to processing, or lodge
a complaint with the relevant authority. Email
[contact@dame.dev](mailto:contact@dame.dev) and describe the request. We may ask
for information needed to verify your account and authority before acting.
Do not send passwords, verification codes or full health records in your first
email. If you disagree with our response, reply with **Privacy appeal** so it
can be reviewed. Do not post health information in public GitHub issues or
social posts.

## Age and policy changes

Altair is intended for adults aged 18 and over and does not offer a parental
consent route for children or teenagers. Contact
[contact@dame.dev](mailto:contact@dame.dev) if you believe an underage person has
provided information.

We update the date above when this policy changes and explain material changes
in the app where appropriate. New uses or disclosures that need consent require
a fresh decision before processing begins.

## Contact

**Emir Yorulmaz (untreu)** — Altair operator.

Privacy, access, deletion and appeals:
[contact@dame.dev](mailto:contact@dame.dev).

The app license is covered by
[Apple's standard Terms of Use (EULA)](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).
