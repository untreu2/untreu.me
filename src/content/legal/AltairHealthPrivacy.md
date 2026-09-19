_Last updated 19 September 2026_

This separate Consumer Health Data Privacy Policy explains how **Emir Yorulmaz
(untreu)**, the operator of Altair, handles consumer health data. For privacy,
access, deletion or appeals, email [contact@dame.dev](mailto:contact@dame.dev).
Read it with the [Privacy Policy](/altair/privacy) and
[health notice](/altair/health-notice).

This release keeps your health profile and conversation history on the iPhone
and stores assistant memory with your account. The renewed cloud-AI notice
covers AI processing, selected health context, and the storage and use of
account memory. Existing users must agree again before use. New memory notes
are created only when you explicitly ask Altair to remember a detail and
confirm it; health data is not automatically extracted into memory. Voice has
an additional notice. Microphone audio streams through Altair’s server to
ElevenLabs. Recognized text and selected context use cloud AI; completed
reply/confirmation text also passes to ElevenLabs for speech. Earlier local
notes and server records follow the retention and deletion description below.

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
  audio, transcripts, response instructions and saved account notes. These
  come from you and the replies generated for your requests. They support
  conversations, meal analysis, transcription and speech. Memory notes contain
  details you explicitly ask to save, such as a dietary preference or allergy,
  and can be used in future conversations on another signed-in device.
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
the temporary AI and speech processing, including microphone audio, recognized
voice text and reply text, described below or the account notes you explicitly
ask to save. Altair does not automatically turn Apple Health records, selected
health summaries, your profile, journal or ordinary conversations into memory.

After you agree to the applicable first-use notice, requests can share:

- **AI with OpenRouter and Google Vertex:** your submitted message or photo,
  relevant conversation text and local instructions pass through Altair's server
  to these providers for replies and meal analysis. Saved account notes are
  included only while memory is on.
- **Selected health context:** the AI agreement also permits selected summaries
  from local reports, profile or meal records to accompany the AI request.
  Selection follows your question. Raw HealthKit sample timelines and your
  complete health history are not sent. Summaries remain health information;
  reducing their detail does not make them anonymous.
- **Voice transcription with ElevenLabs:** after voice agreement and iOS
  microphone permission, microphone audio streams through Altair’s server to
  ElevenLabs and its service providers for live transcription. Audio may contain
  health information. Recognized text participates in the OpenRouter/Google
  Vertex AI flow, which selects context after transcription.
- **Speech with ElevenLabs:** completed reply and action-confirmation text goes
  through Altair’s server to ElevenLabs and its service providers to generate
  speech. That text can contain health details from the conversation, selected
  health context, instructions or saved account notes. You are speaking with an AI
  assistant. Transcripts are saved on the iPhone.
- **Assistant memory:** details you explicitly ask to remember and confirm
  are stored as notes against your account on Altair's server. Under your
  current cloud-AI agreement and while memory is on, saved notes may be
  included in future text and voice requests to OpenRouter and Google Vertex.
  If a spoken reply mentions a saved detail, it also passes to ElevenLabs for
  speech. New notes are not
  created automatically. Earlier device-only notes require a separate explicit
  import choice before they become account memory.

There is no independent health-context switch in the current app. Assistant
memory has an account-wide on/off switch in **Settings → Data & privacy →
Assistant memory**, alongside **Clear memory**. Off stops retrieving notes for
AI and prevents new saves while retaining existing notes. On resumes their use
under the current AI agreement, without another privacy-consent prompt. Memory
starts on for new accounts, but notes are not used or saved before the first AI
agreement; existing saved off choices are preserved. Messages, photos, response
instructions and saved notes can contain health information. **Clear memory**
deletes notes whether memory is on or off and does not change the switch.
Turning off cloud AI also stops their use while retaining them. Altair's
server processes new AI and speech requests temporarily and does not persist
these exchanges, microphone recordings, generated speech audio, attached photos,
selected profile values, reports or the meal journal in its application database.
Speech audio is handled in memory, without recording it to server storage. This is separate from
your account profile photo and notes you deliberately save. Provider retention
is separate. The device saves your resulting conversation and journal.

## Recipients and limits on use

Altair's hosting and database providers carry permitted requests, store your
display name, profile photo, saved account notes and account administration records,
and may retain earlier health content until deletion. **OpenRouter and Google
Vertex** provide AI processing, including replies to recognized voice text.
**ElevenLabs and its service providers** transcribe microphone audio and generate
speech from completed reply/confirmation text. Audio and text can include health
data. The purposes and categories shared are
described above. If you email us health information in a privacy or support
request, it is also processed to handle that correspondence.

Altair does not sell consumer health data or use it for advertising. There is
no affiliate-sharing integration in the current service. Subscription requests
to Apple and RevenueCat do not include health measurements or conversations.
Model requests through OpenRouter use the configured Google Vertex EU route,
zero-retention and denied-collection settings without routing fallback.
Those settings do not establish every provider account setting, contract or
historical deletion. They are not a blanket guarantee of zero retention or no
model training.

ElevenLabs retains speech request and response data by default. Retention,
possible model-improvement use and deletion depend on the applicable agreement,
account settings and [ElevenLabs Privacy Policy](https://elevenlabs.io/privacy-policy).
We do not promise zero retention or no training for speech. Its
[Zero Retention Mode](https://elevenlabs.io/docs/eleven-api/resources/zero-retention-mode)
requires an eligible Enterprise arrangement and supported, configured requests;
the OpenRouter AI route’s settings do not cover ElevenLabs. Voice needs the
speech service connection for transcription and generated speech. Changing
providers does not delete prior speech submissions or historical records.

Processing can occur outside your country. Provider terms, backups and
international-transfer arrangements remain separate from local storage.
Contact [contact@dame.dev](mailto:contact@dame.dev) for the arrangements relevant
to your data, including provider retention and processing locations.

## Consent and withdrawal

Apple Health access is an optional permission controlled by Apple. Before
your first AI dialogue, Altair asks you to agree to messages, submitted photos, relevant
history and selected health, profile and meal context being processed by cloud
AI. The renewed agreement also covers local instructions and the storage and
future use of notes you explicitly ask to save with your account. Agreeing does
not create a note or import earlier device-only notes; those require a separate
explicit choice.
Voice asks for an additional agreement to streaming microphone audio to
ElevenLabs for transcription, sharing completed reply/confirmation text with
ElevenLabs for speech, and using recognized text and selected context for cloud AI. Microphone permission is separately controlled
in iOS. You can choose **Not now**. Local reports and manual journal edits remain available without these
agreements. Reading a policy or accepting terms does not grant permission.

The decision is saved with your account and remembered for later use, including
on another signed-in device. The current AI and account-memory privacy notice
is not repeated for every conversation or saved note. Confirming a requested
change to a note is an action review, not another privacy agreement. Voice has
its additional agreement if not already granted. A renewed choice is required
after withdrawal or a material policy change requiring new consent. Withdraw
permission in **Settings → Data & privacy → Privacy & health** using **Turn off
voice** or **Turn off cloud AI**. Turning
off cloud AI also withdraws selected health-context sharing and voice permission.
Active requests on this device stop and new submissions are blocked immediately;
local health features and manual edits remain available. Altair saves the change
to your account. If that update fails, permission stays off on this device and
the page shows the pending update with **Retry account update**. The server and
other devices receive the withdrawal when the account update succeeds. After
synchronization, enabling the feature again requires agreement to its notice.
Information already sent cannot be recalled. Withdrawal does not automatically
delete saved records. Saved account notes remain until forgotten, cleared or
deleted with the account.
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
and conversations on Altair's server. The server update for this release removes
previously saved health-profile and personalization values from active account
profiles; your display name and profile photo remain. Historical backups and
prior provider submissions have separate deletion processes.

Other earlier health records, meals, reports and conversations are not
automatically transferred or removed when you start the app, agree to processing
or request AI. Legacy transfer routes are retired; historical records do not
block new AI requests. Already-copied device history stays local, and remaining
server data follows account deletion and applicable retention processes.
Contact us for access or deletion requests about older records. Saved account
notes and account administration records remain separately.

Earlier device-only assistant notes stay on the iPhone and are excluded from AI
requests unless you explicitly import them. When these notes are present, the
app offers a separate review with **Save to account** and **Keep on iPhone**
choices. Saving requires your explicit choice, memory to be on and current
cloud-AI agreement.
Keeping them on the iPhone does not upload them or make them available to the
assistant. General AI consent does not import those notes.

Saved account notes have no automatic expiry. Ask Altair to forget a note, or
use **Settings → Data & privacy → Assistant memory → Clear memory** to confirm
deletion of all saved account notes whether memory is on or off, without
changing the switch. After the server confirms deletion, the
current iPhone also removes its earlier device-only notes and memory copies.
Failures are reported. Clear memory preserves ingredients, response
instructions and conversation history. Earlier replies may still mention
a forgotten detail; meals and conversations can be deleted separately.
Clearing active memory does not recall information already sent to providers
or immediately erase backups or private files on another offline device.
Turning memory off stops using saved notes and making new saves without
deleting them. It does not remove a detail from conversation history, which
may still be included in AI requests. Turning off cloud AI also stops memory
use. Revoking
Apple Health access stops future reads; it does not erase saved reports or
replies derived from earlier readings.

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
