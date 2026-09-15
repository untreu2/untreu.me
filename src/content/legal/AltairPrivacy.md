_Last updated 15 September 2026_

Altair is a general wellness app operated by **Emir Yorulmaz (untreu)**. This
policy explains how the iOS app and its supporting services handle personal
information. For privacy, access or deletion requests, contact
[contact@dame.dev](mailto:contact@dame.dev).

The local storage described below applies to Altair's local-data release, whose
privacy choices include **Use cloud AI** and **Include health context with AI**.
Records from earlier versions may still be on Altair's server until migration or
deletion is complete; see **Records from earlier versions** below.

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
- **Health profile and journal.** Age, sex, height, weight, dietary preferences,
  restrictions, allergies, profile pictures, meal descriptions and photos,
  eating times, and nutrition estimates are stored locally.
- **Reports and conversations.** Calculated reports and scores, chat history,
  voice transcripts, and your response instructions are stored locally. Some
  saved content may contain health information or other sensitive details.

These records support your wellness history, reports, journal and conversations.
Local health features and manual edits work without cloud-AI permission. The app
uses iOS file protection for its private files and excludes them from device
backups. Altair does not provide cloud restoration or cross-device syncing of
this local history. Protect access to your iPhone; deleting the app or losing
the device may remove history that Altair cannot recover.

## Information Altair's services retain

- **Account and authentication information:** account identifiers, account name
  and email when supplied by authentication, verification status and related
  account metadata. Firebase handles phone verification and may retain your
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
below and may hold older records pending migration.

## Optional AI processing

Before using cloud AI, Altair asks for your permission. When you submit a
request, your message, deliberately attached photos, relevant conversation
text, local response instructions and enabled server notes pass through
Altair's server to **OpenRouter and Google Vertex**, which provide the AI
response. Meal analysis also uses this flow. A message or photo can contain
health information even when it did not come from Apple Health.

**Include health context with AI** is a separate choice. If enabled, Altair uses
your question to select relevant summaries from your on-device health reports,
profile or meal journal. Only the selected context is sent for that request;
raw HealthKit sample timelines and the complete health history are not sent.
Summaries remain sensitive health information and are not necessarily anonymous.

With health context off, Altair omits additional structured health, profile and
meal context and does not replay stored health-bearing conversation history.
Information you deliberately include in the current message or photo, your
response instructions and enabled server notes can still be sent under your
cloud-AI choice.

The local-data service processes these requests temporarily and does not save
their messages, photos, summaries or replies in Altair's application database.
Conversation history and resulting meal changes are saved on your device.

## Optional voice processing

Voice requires its own choice in addition to cloud-AI permission. Microphone
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
Our requirements for AI and voice processors are that they use submitted content
to provide the requested service, do not use it for advertising or independent
model training, and provide protection consistent with this policy. Cloud AI
and voice are unavailable when the required provider privacy setup has not been
verified. AI routing requests no-training and zero-retention handling; those
controls do not establish that every vendor record or earlier submission has
already been deleted.

Providers can process information outside your country. Retention, processing
locations and international-transfer arrangements depend on the service and
applicable terms. Contact [contact@dame.dev](mailto:contact@dame.dev) for
information about the providers and arrangements relevant to your request.

Connections to Altair's production service use HTTPS. Cloud AI and voice
processors need to read the submitted information to provide their services;
these features are not end-to-end encrypted between only your devices.

## Retention and deletion

**Local history.** Altair refreshes a rolling 90-day window of readable Apple
Health records to rebuild local summaries. This is a calculation window, not
an overall 90-day deletion policy. Saved reports, conversations, meals and
imported history have no automatic expiry. Signing out leaves private history
on the same iPhone for that account. Deleting a meal or conversation removes
that item from the local journal or history. Previously saved reports and
replies may still contain information derived from it.

**Server notes and account records.** Notes remain until you delete them or
delete your account. Disabling memory stops its use for AI but does not delete
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

Earlier Altair versions stored account-linked health records, profiles, meals,
photos, reports and conversations on the server. The local-data release first
downloads and verifies a complete copy on your iPhone, then requests removal of
the corresponding server records. Server records are removed only after that
verified copy exists and the service validates its confirmation. Interrupted
migrations can be retried; removal may already have finished if the confirmation
response was interrupted, while the verified iPhone copy remains available.

Pending migration is shown in the app's privacy choices. AI processing is
unavailable for that account until migration finishes. The new local history
is not uploaded as part of migration. Account administration, subscriptions,
consent records and optional server notes remain as described above. Historical
backups and prior provider submissions follow their separate lifecycles.

## Your choices and privacy requests

- Choose cloud AI, additional health context and voice separately before use.
  These options start off when a new privacy decision is needed. Saving choices
  does not send your message or start recording.
- Change or withdraw a choice in **Settings → Data & privacy → Privacy & health
  → Change privacy choices**. Withdrawal stops new processing and interrupts
  active requests. Information already transmitted cannot be recalled, and
  withdrawal does not automatically delete saved records.
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
