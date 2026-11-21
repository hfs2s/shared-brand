# Shared Studio design reference

Generated from the saved [Shared Studio](https://brand.getshared.ai/) pages. Use the live examples to inspect layout, interaction and assets.

For hfs2s deliverables, apply the [official hfs2s brand kit](https://hfs2s.app/brand/) and the repository branding rules. Use this reference for Shared Studio patterns and for work that adopts the Shared identity.

**Heading typography.** Use Instrument Serif only for H1 page titles. Use Inter for H2 and H3 headings. [Typography guide](https://brand.getshared.ai/brand#type).

Studio source revision: `6c14172d7d34083c`.

## Design tokens

**Heading typography.** Use Instrument Serif only for H1 page titles. Use Inter for H2 and H3 headings.

[Source stylesheet](https://brand.getshared.ai/tokens.css)

```css
/* Shared foundations */
:root {
  --paper: #fdf3e5;
  --stock: #f7eee2;
  --ink: #1e1e1b;
  --mute: #5c5a54;
  --line: #d8d0bf;
  --blue: #3157c8;
  --lemon: #f4f56e;
  --mint: #dceee0;
  --metal: #a7ada1;
  --orange: #f18d53;
  --body-size: 1rem;
  --body-leading: 1.5;
  --display-weight: 400;
  --display-tracking: -.012em;
  --display-serif-scale: 1.14;
  --serif-scale: 1;
  --type-h1: clamp(71px, 9.6vw, 165px);
  --type-h2: clamp(27px, 3.1vw, 42px);
  --type-h3: clamp(20px, 1.9vw, 26px);
  --type-h4: clamp(17px, 1.35vw, 20px);
  --type-card-title: clamp(16px, 1.2vw, 18px);
  --type-meta: .75rem;
  --type-lead: clamp(17px, 1.4vw, 23px);
  --gutter: clamp(22px, 6vw, 112px);
  --section-space: clamp(50px, 7vw, 116px);
  --content-gap: clamp(18px, 3vw, 48px);
  --form-gap: clamp(16px, 2vw, 27px);
  --wrap-max: 1680px;
  --grid-step: 28px;
  --focus-width: 3px;
  --focus-offset: 4px;
  --control-height: 44px;
  --control-radius: 4px;
  --control-pad-y: 9px;
  --control-pad-x: 18px;
  --icon-gap: 16px;
  --display-serif: "Instrument Serif", serif;
  --serif: var(--sans);
  --sans: Inter, Arial, sans-serif;
  --mono: JetBrains, monospace;
  --motion-fast: 120ms;
  --motion-enter: 220ms;
  --motion-loop: 1200ms;
  --motion-ease: cubic-bezier(.2,.8,.2,1);
}

/* Display type for page titles. */
h1 {
  --serif: var(--display-serif);
  --serif-scale: var(--display-serif-scale);
  font-family: var(--display-serif);
}
.tr-role-example :is(h1,h2,h3) {
  font: inherit;
  letter-spacing: inherit;
}

/* Studio heading roles also govern older page rules with local display sizes.
   Embedded artwork and type specimens keep their own proportional scale. */
main h2:not(:where(.sheet *, .tr-role-example *, .page-preview *)) {
  font-family: var(--sans);
  font-size: var(--type-h2) !important;
  font-weight: 620;
  line-height: 1.16;
  letter-spacing: -.025em;
}
main h3:not(:where(.sheet *, .page-preview *, .tr-role-example *, .variant-card *, .reaction-card *, .pg-card *, .sketch-card *, .poster-variant > h3, .social-group > h3, .artifact-notes *)) {
  font-size: var(--type-h3) !important;
  font-weight: 620;
  line-height: 1.24;
  letter-spacing: -.018em;
}
main h4:not(:where(.sheet *, .page-preview *, .tr-role-example *, .social-card *, .tr-role-copy *)) {
  font-size: var(--type-h4) !important;
  line-height: 1.3;
}

/* Heading role governs the font family in Studio pages and specimens. */
h2, h3 { font-family: var(--sans) !important; }
```

## Studio overview

[Open the working examples](https://brand.getshared.ai/)

Shared is the operating system for teams of people and AI agents. Give each agent a job, decide what it can access, and keep the work with the team.


### [Bring the work into the room.](https://brand.getshared.ai/#work)

Ask Juan, an AI agent, to bring up a slide in Rooms. Everyone can see the same slide while the conversation carries on. Teams can also work with their agents in Juan Live and WhatsApp.


### [A seat for Lola.](https://brand.getshared.ai/#main)

Matt’s team works with Lola on a dedicated node. That’s the environment she runs in. Her seats are the working sessions where she can take on a task.

Team

- Matt’s team

Environment

- Dedicated node

Runtime

- 2lp


### [At Milo’s mic.](https://brand.getshared.ai/#main)

Milo, an AI agent, runs the AI Engineers Barcelona podcast. A community gives the agent a particular job. The group decides who can ask for what and which decisions to keep between episodes.


### [Bring one workflow.](https://brand.getshared.ai/#main)

Matt and Rafa help teams and communities put shared agents to work. Start with one recurring job. Who asks for it? What can the agent use? Who gets the work back?

## Foundations and components

[Open the working examples](https://brand.getshared.ai/brand)

**Heading typography.** Use Instrument Serif only for H1 page titles. Use Inter for H2 and H3 headings.

Working specifications for the Shared studio, from foundations and components to navigation and data visualization.


### [Logo](https://brand.getshared.ai/brand#panel-foundations)

Build every form from an equal square. Centre the three dots in the orange bubble, where they sit on the half module. Keep colour fields solid and leave two modules around the visible mark. Use the compact mark when the full signature won’t read.


### [Colour tokens](https://brand.getshared.ai/brand#panel-foundations)

Choose a swatch to copy its hex value. The Shared studio loads these tokens directly. Inset the colour sample and labels within the stepped swatch edge.


### [Contrast](https://brand.getshared.ai/brand#panel-foundations)

Use ink on paper for default text and blue on paper for links. Regular text needs at least 4.5:1.

- Text ∣ Surface ∣ Ratio

- Ink ∣ Paper ∣ 15.22:1

- Ink ∣ Lemon ∣ 14.43:1

- Mute ∣ Paper ∣ 6.28:1

- Blue ∣ Paper ∣ 5.75:1

- Ink ∣ Mint ∣ 13.81:1


### [Layout and focus](https://brand.getshared.ai/brand#panel-foundations)

Preserve reading order at both desktop and phone widths. Keep foreground text clear and space related controls closer together.

- Token ∣ Value ∣ Use

- Page gutter ∣ 22–112 px ∣ Fluid inset

- Page wrap ∣ 1680 px ∣ Max content width

- Paper grid ∣ 28 px ∣ Backdrop only

- Field gap ∣ 16–27 px ∣ Related fields

- Section space ∣ 50–116 px ∣ Major sections

- Control height ∣ 44 px minimum ∣ Buttons and fields

- Focus ring ∣ 3 px blue, 4 px offset ∣ Keyboard focus

- Select caret ∣ 11 px, 16 px from edge ∣ Closed dropdowns


### [Typography](https://brand.getshared.ai/brand#panel-type)

Use Instrument Serif only for H1 page titles. Use Inter for H2 and H3 headings. Use Inter for smaller headings, body copy, form labels and fields. Use JetBrains Mono for links, buttons and technical labels. Radio options and dropdowns use Inter. Use the same stepped shape for the button border and fill so the background follows the pixel corners. The examples below show how each role behaves in the studio.


#### [Live specimen](https://brand.getshared.ai/brand#type-workbench)

Adjust the family, size, weight, leading, tracking and line measure. Presets start at recommended values for common roles.


#### [Type scale](https://brand.getshared.ai/brand#type-scale)

These are the studio defaults from the shared stylesheet. The viewport examples are rounded at 390 px and 1440 px. Display headings use Instrument Serif Regular with −0.012em tracking. The larger display scale compensates for its narrow proportions.

- Role ∣ CSS token or size ∣ 390 / 1440 ∣ Weight · leading ∣ Use

- Display ∣ --type-h1 ∣ 71 / 138 px ∣ 400 · 0.99 ∣ Instrument Serif. The landing-page display uses 0.93 leading.

- Section ∣ --type-h2 ∣ 27 / 42 px ∣ 620 · 1.16 ∣ Inter for sections.

- Subheading ∣ --type-h3 ∣ 20 / 26 px ∣ 620 · 1.24 ∣ Inter. Name an example or subsection.

- Card title ∣ --type-card-title ∣ 16 / 17 px ∣ 620 · 1.28 ∣ Inter. Keep titles shorter than the section heading.

- Metadata ∣ --type-meta ∣ 12 / 12 px ∣ 400 · 1.4 ∣ JetBrains Mono. Use for dimensions and technical labels.

- Lead ∣ --type-lead ∣ 17 / 20 px ∣ 400 · 1.47 ∣ Inter. Use for a short introduction.

- Body ∣ --body-size ∣ 16 / 16 px ∣ 400 · 1.5 ∣ Inter. Use for running text and most guidance.

- Action ∣ 0.89rem ∣ 14 / 14 px ∣ 600 ∣ JetBrains Mono. Keep the action target at least 44 px high.

- Secondary label ∣ 11–12px ∣ 11–12 / 11–12 px ∣ 400–600 ∣ JetBrains Mono. Use for compact metadata.


##### [Instrument Serif](https://brand.getshared.ai/brand#type-scale)

Use Regular (400) for H1 titles.


##### [Inter](https://brand.getshared.ai/brand#type-scale)

The declared range is 100–900. Start body copy and field values at 400, form labels at 600 and compact headings at 650.


##### [JetBrains Mono](https://brand.getshared.ai/brand#type-scale)

The declared range is 100–800. Use JetBrains Mono for links and start buttons at 600. Use 400–600 for token samples, times and metadata.


#### [Examples by role](https://brand.getshared.ai/brand#type-roles)

Forty rendered specimens pair the visual treatment with a use case. Adjust a similar role in the live specimen to test real content.


##### [Editorial and campaign](https://brand.getshared.ai/brand#type-roles)

Choose the role by what the line needs to do. Use the display face for the main idea and let body text carry the detail.

A one- or two-line proposition on a landing page. Keep the main phrase short enough to wrap cleanly on phones.

Start a distinct part of the story. Keep the same section rhythm between pages.


### [The future is something we make.](https://brand.getshared.ai/brand#type-roles)

Name the subject of a story or example within a section.


#### [The paper plotter](https://brand.getshared.ai/brand#type-roles)

Use when an editorial title shares a small area with metadata or a thumbnail.

A seat for Lola

A short introduction after the heading. Keep the sentence readable at the full range of widths.

Give each agent a job, decide what it can access, and keep the work with the team.

Use this rhythm for running text. Keep a paragraph to one thought.

Juan brings a folded paper model into the room. Lola points out the next change, and Nando checks the drawing before the team moves on.

Give one short line space to stand on its own. If it quotes a real person, include attribution.

“We can all see the same page.”

Describe the action or identify the subject below the image.

Juan and Lola review the slide viewer.

Use mono to set credits apart from the story.

Shared studio · Campaign art

Add a short category when the heading benefits from context.

CAMPAIGN PHOTOGRAPHY


##### [Product and navigation](https://brand.getshared.ai/brand#type-roles)

Give actions, headings and states distinct visual roles while keeping the line lengths short.

Name the current task or surface. Keep display typography for editorial moments.

Campaign review

Lead with the question or object the user is working on.

Who can see this room?

Labels name a place. Indicate the current destination with an underline and aria-current.

Photography

Use brief nouns for in-page topics. Label the active panel programmatically.

Components

Choose a short verb and object. Keep the hit area large enough for touch.

Save access

Give a secondary action a familiar verb. Reserve underlines for text links.

Preview changes

Use enough context to predict the destination. Underlining keeps the cue visible.

Open the campaign photography

Keep the label beside the icon where possible. Put the state on its own short line.

Share screen

Show the actual on, off or active state next to the control.

Sharing

Use a sentence for a short explanation. Put essential instructions beside the control.

A seat is a working session for an agent.


##### [Forms and feedback](https://brand.getshared.ai/brand#type-roles)

Keep a field’s label, help and errors attached to it. Short feedback should say what the user can do next.

Describe the result the form will create or change.

Create a room

Keep the label visible above the value and associate it with the input.

Room name

Use plain input text. Settings and values should have enough visual weight to scan.

Campaign review

Mark optional fields in the label. Keep the cue when the input is filled.

Website (optional)

Use a concrete format example where it makes validation easier.

https://example.com/studio

Explain a limit before submit. Link the help to the input with aria-describedby.

Choose a capacity from 2 to 30.

Tell the user what to correct and keep their earlier answers in place.

Enter a room name.

Describe the ongoing operation in plain language.

Preparing the website preview…

Name what completed. Add a next action if the result needs one.

Campaign review is ready.

State what is missing and provide an action to add the first item.

No campaign files yet.


##### [Data and working metadata](https://brand.getshared.ai/brand#type-roles)

Keep dense labels aligned and legible. Let the column, cell or filename tell the reader how to interpret a value.

Use a concise header with a real table cell and scope.

File name

Give the primary value enough size to scan across rows.

Listening dish

Use tabular figures and right-align numeric values in a comparable column.

12.04 MB 2.75 MB 0.42 MB

Use steady-width figures for clocks and progress readouts.

00:26

Use mono for artefact names, short paths and extensions.

shared-09.svg

Use a short format cue. Put the recognizable title first.

SVG · VECTOR

Keep the line copyable. Wrap when the surrounding layout permits.

--section-space: clamp(50px, 7vw, 116px);

Use a precise state and preserve its contrast on the colour surface.

In review

Pair a shortcut with a labelled action and support platform conventions.

⌘ K

Name the author or participant and clarify the role without crowding the primary action.

Lola · AI agent


#### [Type in context](https://brand.getshared.ai/brand#type-context)

Pair the roles the way people encounter them in a page, form or file list.

STUDIO PHOTOGRAPHY

The paper plotter

Juan traces the drawing while Lola holds up the bird. Both are visible in the opening photograph.

Create a room

Room details ready.

Try the full form

Campaign assets

Browse photography


#### [Measure and responsive type](https://brand.getshared.ai/brand#type-reading)

Use roughly 50–72 characters per line for sustained reading. Let narrow layouts wrap naturally. At 200% zoom, content should remain readable and controls should stay reachable.


##### [Editorial line length](https://brand.getshared.ai/brand#type-reading)

Juan brings a folded paper model into the room. Lola points out the next change and Nando checks the drawing. The team can see what needs work before anyone starts moving the pieces.


##### [Narrow layout](https://brand.getshared.ai/brand#type-reading)

Juan brings a folded paper model into the room. Lola points out the next change and Nando checks the drawing.


##### [Wrap by meaning](https://brand.getshared.ai/brand#type-reading)

Use natural heading wraps. Keep an action’s verb and object close. Check long translations and people’s names before setting a maximum width.


##### [Long values](https://brand.getshared.ai/brand#type-reading)

Wrap paths and token values where possible. When a cramped list truncates a name, supply the full value on focus, in a details view or beside a copy action.


##### [Hierarchy](https://brand.getshared.ai/brand#type-reading)

Use one page-level heading. Nest section and example headings in order. Use weight and spacing alongside size so the structure survives font fallback.


#### [Characters and formats](https://brand.getshared.ai/brand#type-characters)

Proof the actual strings the interface will display. Names, code values, punctuation and translated labels have different widths.

Aa Bb Cc Dd Ee Ff

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

Mór · São Paulo · Bogotá · Zürich

À bientôt · mañana · ação

00:26 01:04 03:18

0.42 MB 2.75 MB 12.04 MB

{ } / \\ · → … # @ 0 O 1 l I

icon-media/flat/reply.svg


#### [Implementation](https://brand.getshared.ai/brand#type-implementation)

The studio serves all three families locally as WOFF2. Use the shared style and tokens in the same order as the studio. Keep display swap enabled so text can appear before a font has loaded.


##### [Fallbacks](https://brand.getshared.ai/brand#type-implementation)

The fallback stacks use a platform serif, Arial and a platform monospace. Test that layout and labels remain usable while the preferred face loads.


##### [Colour and focus](https://brand.getshared.ai/brand#type-implementation)

Use text and focus colours from Foundations. Aim for 4.5:1 for regular text, and keep the keyboard focus ring visible beside the label.


##### [Motion labels](https://brand.getshared.ai/brand#type-implementation)

Render loader titles, stages and timings as live text. Add an accessible status for stage changes, and keep decorative markings inside the illustration.


### [Emoji and symbols](https://brand.getshared.ai/brand#panel-icons)

Lead with the five Reviewer Inbox reactions. Core marks use a 16 × 16 grid. Action icons use a 32 × 24 grid to keep the object and operation readable.


### [Paper and flat artwork](https://brand.getshared.ai/brand#panel-icons)

Use the vector-only marks for compact controls. Use the paper finish at larger sizes. Each paper sprite carries one image shared by the SVG silhouettes.


### [The icon collection](https://brand.getshared.ai/brand#catalog-title)

200 base symbols and 9,800 object–action icons. Use an action filter for a task such as Download · File. Browse 100 results per page and use the full SVG archive for downloads.

Sketch mode icon library


#### [Results](https://brand.getshared.ai/brand#results-title)

Try a shorter search or clear the filters.


### [Actions and dialog](https://brand.getshared.ai/brand#panel-components)

Use the sharing dialog when people need to inspect a file’s access before saving. The file and its permission scope stay visible above the action. Save commits the selected scope in this demo. Cancel and Escape keep the existing access.

Set who can open this campaign file.


### [Reaction picker](https://brand.getshared.ai/brand#panel-components)

Choose one of the existing Reviewer Inbox emoji. Choosing it again clears the reaction. The selection has both a visible and an announced state.

Which reaction fits this hero image?


### [Treatment selector](https://brand.getshared.ai/brand#panel-components)

Use a native radio group when exactly one view is visible. The same selector powers the photography studies.


### [Generative UI](https://brand.getshared.ai/brand#panel-components)

See how approved components are assembled from a structured view. Use the motion guide to choose feedback for a request that takes time.

Run the motion and loading examples

Try the 20+ second loading screens


### [Actions and navigation](https://brand.getshared.ai/brand#components-group-1)

Use these pieces to move, choose or act. Controls provide keyboard focus and a visible state.


#### [Button](https://brand.getshared.ai/brand#button)

Use a button for an action on the current page. Primary, secondary and quiet styles share the same hit area.

Use one primary action per task. Press Enter or Space. Disable a control while its request is pending and announce the result.


#### [Loading button](https://brand.getshared.ai/brand#button-async)

Use a loading state when an action takes time. Keep the label meaningful and preserve the width.

The focused control remains in place. The outcome is announced once. Failed requests should show the reason and a retry.


#### [Link and download](https://brand.getshared.ai/brand#link)

Use anchors for navigation and downloads. Include the type when the destination is a file.

Underlining and the focus outline distinguish links. Use a descriptive link label instead of a raw URL.


#### [Icon button](https://brand.getshared.ai/brand#icon-button)

Use an icon button when an action is familiar and space is constrained.

Give the control an accessible name. Keep the hit target at least 44 px. The pressed state has both a visual and a programmatic indication.


#### [Toggle group](https://brand.getshared.ai/brand#toggle-group)

Use a set of pressed buttons for independent options. For a single selection use radio inputs.

Each button keeps its own pressed state. The pressing action retains focus and announces the new state.


#### [Tabs](https://brand.getshared.ai/brand#tabs-component)

Separate related views within the same task. Use the main guide tabs when the topics each own substantial content.

Arrow keys move between tabs and select a panel. Home and End jump to the first and last tabs. Only the active panel is in the reading order.

A shared room for reviewing the paper plotter.

Lola uploaded the campaign draft.


#### [Breadcrumb](https://brand.getshared.ai/brand#breadcrumbs)

Use a breadcrumb when users need to know where an item sits in a hierarchy.

Use a named navigation region and mark the final item with aria-current. Keep path links usable at narrow widths.


#### [Disclosure or action menu](https://brand.getshared.ai/brand#menu)

Use disclosure for a short group of supplementary links or controls. Keep destructive actions in a confirmation flow.

The summary is a native control. Press Enter or Space to open it. Links in the open panel follow normal Tab order.


#### [Pagination](https://brand.getshared.ai/brand#pagination)

Use pagination when a collection is too long to render or scan in one view.

Keep Previous and Next disabled at the limits. Announce which results are visible. Preserve page state in the URL for shareable collections.

Open the live icon pagination


#### [Search and clear](https://brand.getshared.ai/brand#search-field)

Show the accessible label, placeholder and a way to clear a filter. Keep the criteria visible while showing the results.

Match on title and supporting terms. Announce result count, show recovery when empty and retain controls when there are no matches.

- Paper plotter

- Listening dish

- Slide viewer


### [Status and feedback](https://brand.getshared.ai/brand#components-group-2)

Keep the status beside the work. Pair colour with a word or symbol.


#### [Status chip](https://brand.getshared.ai/brand#status-chip)

Use a chip for a short status describing an item. Static chips have no tab stop.

Pair a status colour with literal text. Use an existing named state, such as draft, in review or ready.


#### [Removable filter chip](https://brand.getshared.ai/brand#filter-chip)

Show active filters as short chips in a search result or table toolbar.

The button name includes the filter value. Removing it returns focus to the remaining filter control and updates the result count.


#### [Inline notice](https://brand.getshared.ai/brand#notice)

Show a message beside the affected content. Use a warning for a recoverable condition and an alert for a failure needing attention.

Give the user an action. Announce newly added errors. Static notices remain in the reading order without demanding focus.

Choose a JPG, PNG, SVG or PDF.

The review can continue.


#### [Toast](https://brand.getshared.ai/brand#toast)

Use a temporary receipt for a completed action with low risk. Keep important errors beside the work.

Announce it as a status. Include a dismiss control when it covers content. The demo leaves the toast visible until you dismiss it.


#### [Progress](https://brand.getshared.ai/brand#progress)

Use a progress element for a known percentage. Use an indeterminate status when the total is unknown.

Give the control an accessible name. Indicate completed work with a text receipt, even after a bar reaches 100%.


#### [Empty state](https://brand.getshared.ai/brand#empty)

Name the missing content and give the user a useful next step.

Keep surrounding navigation available. After the first item is created, replace the empty state with the new content.

No files in this room yet.


#### [Recoverable error](https://brand.getshared.ai/brand#retry)

Place a retry action beside an error when the underlying request can be repeated.

Keep inputs intact, prevent duplicate retries and announce when the connection is back.

Your filters are still set.


#### [Loading placeholder](https://brand.getshared.ai/brand#skeleton)

Use a few quiet blocks to reserve the layout for incoming content.

Hide decorative placeholders from assistive technology and put one status on the region. Replace them with the content when ready.

Preview waiting.


### [Content and overlays](https://brand.getshared.ai/brand#components-group-3)

Use precise hierarchy in item views and keep actions attached to their objects.


#### [File card](https://brand.getshared.ai/brand#file-card)

Give the file a recognisable title, format and primary action. Add a thumbnail only when it helps users identify it.

Keep links and buttons separate. Give download links a useful file name and format.


#### [Sortable table](https://brand.getshared.ai/brand#data-table)

Choose a table for repeated values where readers need to compare rows and columns.

Use header cells with scope. Set header sorting controls as underlined text and set aria-sort on the sorted column.

- Type

- Paper plotter ∣ Photo

- Listening dish ∣ Photo

- Campaign film ∣ Video


#### [Key–value details](https://brand.getshared.ai/brand#definition-list)

Use a definition list when individual fields describe one record, such as a room or an agent.

Keep labels in a consistent order. Use a descriptive empty value if a field is unavailable.

Agent

- Lola

Environment

- Dedicated node

Runtime

- 2lp


#### [Avatar and identity](https://brand.getshared.ai/brand#avatar)

Use a framed portrait beside a name. Add initials as a fallback when a photograph is unavailable.

Keep the person’s name in text. Use empty alt text when the portrait repeats the adjacent name.


#### [Tooltip](https://brand.getshared.ai/brand#tooltip)

Use a brief tooltip for a supporting explanation. Keep required instructions visible in the interface.

Show it on hover and keyboard focus. Escape dismisses it until focus or pointer leaves. The trigger carries the accessible name.


#### [Popover](https://brand.getshared.ai/brand#popover)

Use a popover for compact supplementary content adjacent to a control.

Native popovers support light dismiss. The toggle has a useful name and Escape closes it.

Lola added the paper bird study.


#### [Modal dialog](https://brand.getshared.ai/brand#modal)

Use a focused dialog for room details, access changes or high-impact decisions. Keep the title, description and footer actions visible when the middle scrolls.

Opening moves focus into the dialog. Escape closes it and returns focus to the trigger. Use a quiet close button at the top and a clear completion action in the footer. On phones the same dialog opens as a bottom sheet.


#### [Accordion](https://brand.getshared.ai/brand#accordion)

Use disclosure panels for supplemental instructions or a long list of questions.

A summary works with Space and Enter. Put headings and links inside the panel in reading order.

Use SVG for logos and icons, and WebP or JPG for photography.

The browser saves sketches, icon packs and imagery to its downloads folder.


#### [Media controls](https://brand.getshared.ai/brand#media)

Use native playback controls for video when possible and a useful still frame before playback.

The film is silent and started by the user. Supply captions or a transcript when a clip includes speech.


#### [Portrait crop](https://brand.getshared.ai/brand#portrait)

Use a rectangular photograph or a cutout framed so any clipped shoulder aligns to an image edge.

Keep portraits readable at narrow sizes. Retain identity and the action in the frame. A figcaption adds context.

Try a different term or clear the search.


### [Form controls](https://brand.getshared.ai/brand#panel-forms)

Use a cream field with a stepped rim, a quiet label and a blue keyboard focus outline. Lemon keys commit the form. Give each field enough room for its label, value and feedback.


### [Field controls](https://brand.getshared.ai/brand#forms-group-1)

Use native fields where they fit. Labels stay visible during input. Optional and required cues belong in text.


#### [Text input](https://brand.getshared.ai/brand#text)

Short free text or a name.

Keep the label visible and provide autocomplete when the browser knows the field.


#### [Email address](https://brand.getshared.ai/brand#email)

Sign-in, invitations and contact details.

Let the browser offer its email keyboard. Validate format during submit and describe invalid addresses in text.


#### [Password reveal](https://brand.getshared.ai/brand#password)

Use a password control for secrets. Offer a reveal toggle when users need to review what they typed.

Use the preview value here. In a product form use current-password or new-password and avoid reading the value aloud.


#### [Website address](https://brand.getshared.ai/brand#url)

Public links and resource URLs.

Keep a full URL example visible in help text. Show validation beside the input.


#### [Phone number](https://brand.getshared.ai/brand#tel)

Phone numbers with country codes.

Use a telephone keyboard. Support regional spacing and prefixes.


#### [Search input](https://brand.getshared.ai/brand#search-input)

Query a component or record catalog.

Support the native clear control where available. Retain an explicit label.


#### [Number and limits](https://brand.getshared.ai/brand#number)

Numeric quantity with a meaningful range.

Publish the minimum, maximum and step. Use text for digits that are identifiers.


#### [Date](https://brand.getshared.ai/brand#date)

A day without a time.

Validate ranges and retain the locale-specific native picker.


#### [Time](https://brand.getshared.ai/brand#time)

A local time of day.

Show the timezone next to the field when it matters.


#### [Date and time](https://brand.getshared.ai/brand#datetime)

A scheduled local timestamp.

Include an explicit timezone. Convert to the storage timezone at the application boundary.


#### [Month](https://brand.getshared.ai/brand#month)

A month-level period.

Keep the year visible so the range remains clear.


#### [Week](https://brand.getshared.ai/brand#week)

A week-level period.

Show an example and verify the native picker on supported browsers.


#### [Range slider](https://brand.getshared.ai/brand#range)

A relative setting that has an understandable scale.

Display the current value as text. Arrow keys adjust by one step.


#### [Colour input](https://brand.getshared.ai/brand#colour-field)

Select a custom swatch in a design or annotation tool.

Expose the hex value in text. Keep a named token as the default.


#### [Select menu](https://brand.getshared.ai/brand#select)

Choose one item from a known list.

Use a native select for short lists. Give the initial choice a defensible default.


#### [Multi-select](https://brand.getshared.ai/brand#multiselect)

Choose one or more records from a list.

For a short list of everyday settings prefer checkboxes. Add help for the platform selection modifier.


#### [Textarea](https://brand.getshared.ai/brand#textarea)

Multi-line notes, descriptions and chat.

Announce a limit when it matters. Keep resize available in the vertical direction.


#### [File input](https://brand.getshared.ai/brand#file)

Select a local file for potential upload.

Show allowed types and size. The example displays the filename locally.


#### [One-time code](https://brand.getshared.ai/brand#otp)

Short verification code.

Use one field with numeric input mode and support pasting the whole code.


#### [Read-only and disabled](https://brand.getshared.ai/brand#read-only)

Use read-only for useful values that must remain available. Disable controls that cannot act in this state.

Read-only inputs retain focus and can be copied. Explain why a related action is unavailable.


#### [Checkbox](https://brand.getshared.ai/brand#checkbox)

Choose independent options or acknowledge a requirement.

Label the positive condition. Represent checked and unchecked states with the native input.


#### [Radio group](https://brand.getshared.ai/brand#radio)

Choose one option from a short list.

Use a fieldset with a legend. Arrow keys move the selection in the native group.


#### [Switch](https://brand.getshared.ai/brand#switch)

Turn a persistently named setting on or off.

Use a binary control with a stable label. The checked state must match the true value.


#### [Validation and help](https://brand.getshared.ai/brand#field-states)

Pair each input with help or an error directly below it.

The invalid field uses aria-invalid. Connect the error with aria-describedby, focus the first invalid field and retain the rest of the form.


### [Complete forms](https://brand.getshared.ai/brand#forms-group-2)

Each example runs locally. Product code connects the same patterns to its permission checks and application services.


#### [Sign-in form](https://brand.getshared.ai/brand#sign-in)

Start a sign-in flow with an email address. Use the account’s existing sign-in option where available.

Focus an invalid field. Confirm the next step after submit. Avoid exposing whether an address exists.


#### [Verification form](https://brand.getshared.ai/brand#verification)

Collect a six-digit sign-in code in one labelled field.

Support paste and one-time-code autocomplete. Keep resend as a secondary action. Present invalid and expired codes beside the field.


#### [Profile form](https://brand.getshared.ai/brand#profile)

Collect display name, bio and optional website in one short setup step.

Use relevant autocomplete values. Keep optional fields labelled. Preserve entered text when validation fails.


#### [Create a room](https://brand.getshared.ai/brand#room-create)

Collect a name, access scope and guest capacity together.

A private default makes permission changes deliberate. Validate capacities, show room name in the receipt and keep the form ready for correction.


#### [Invite and assign a role](https://brand.getshared.ai/brand#invite)

Collect the recipient and permission in the same view.

The role determines what the recipient can do. Start with Viewer. In live product code validate roles and access on the server before saving.


#### [Lobby and device settings](https://brand.getshared.ai/brand#devices)

Let a participant review mic, camera and audio output before joining.

Keep mic and camera independent. In an app, ask for permission only when the user chooses a device action and show recovery beside the affected control.


#### [Agent settings](https://brand.getshared.ai/brand#agent-config)

Group voice, model and verbosity as one configuration. Guide the user through what the session can use.

Keep settings available for review when changes are restricted. Announce saving and retryable errors without clearing the selected values.


#### [Asset upload form](https://brand.getshared.ai/brand#upload)

Ask for the title and file together. Explain file types before selection.

Check the file type and size before submitting. Show a specific error. A real upload reports progress and supports retry using the same file selection.


#### [Message and review composer](https://brand.getshared.ai/brand#composer)

Keep the message visible while a request sends. Allow attachments only where they are useful.

Validate that there is something to send. Confirm the new item and clear the composer only after success.


#### [Schedule form](https://brand.getshared.ai/brand#schedule)

Pair date, time and timezone. Show the interpretation beside the result.

Validate each field independently. In a live app, check that the scheduled time exists in the selected timezone.


#### [Preferences form](https://brand.getshared.ai/brand#settings)

Use switches for independent preferences. Show a save action when several choices commit together.

Reflect the committed state in a receipt. In live settings, failed saves leave the previous values active.


#### [Destructive confirmation](https://brand.getshared.ai/brand#destructive)

Name the exact object in the title and describe what the user will lose. Keep confirmation next to a clearly labelled cancel action.

Focus starts on Cancel. Use the red action for the destructive step. Confirm removes one sample from the preview and reveals a way to restore it.

Draft test room

Try a different term or clear the search.


### [Dataviz](https://brand.getshared.ai/brand#panel-dataviz)

Show one comparison, trend or relationship per figure. Use a finding as the title, label the units, and include the source and time period. These examples use fictional studio data.


#### [Chart and diagram styles](https://brand.getshared.ai/brand#dataviz-spec)

Type

- Use Inter for figure titles and annotations, and JetBrains Mono for axes, values and units. Keep labels at 12px or larger at the final size.

Colour

- Use paper for the canvas, ink for text, muted ink for secondary labels, and line for grid rules. Lead with blue for the primary series. Use ink with a dashed stroke or a different marker for a second series. Use lemon or mint as annotated fills with ink text.

Geometry

- Use 1px grid rules, 2px series strokes, 6px markers where individual points need emphasis and 24px diagram gaps as starting values. Start quantitative bars at zero. Use even time intervals and show missing time-series data as a gap.

Reading order

- Directly label series when they fit. Use a compact key for narrow plots. Use patterns, shapes or text to pair with colour. Give each chart a plain-language summary and an accessible table or data link. Keep diagrams in reading order with labelled steps.

Download Dataviz CSS Download Ledger chart CSS Download example data

Chart examples Relationships and distribution Targets and uncertainty Diagrams Timelines and branches Charts with photography Ledger patterns


#### [Charts](https://brand.getshared.ai/brand#dataviz-charts)


##### [Reviews by room](https://brand.getshared.ai/brand#dataviz-charts)

Workshop recorded the most reviews in November. Horizontal bars leave room for category names and start from zero.

Source: Shared Studio sample data · November 2026 · reviews

- Room ∣ Reviews

- Workshop ∣ 12

- Studio ∣ 8

- Library ∣ 5


##### [Weekly room activity](https://brand.getshared.ai/brand#dataviz-charts)

Reviews rose from 2 to 7 over four weeks. The dashed series tracks follow-ups.

Source: Shared Studio sample data · November 2026 · events per week

- Week ∣ Reviews ∣ Follow-ups

- 1 ∣ 2 ∣ 1

- 2 ∣ 4 ∣ 3

- 3 ∣ 5 ∣ 2

- 4 ∣ 7 ∣ 4


##### [Share of reviews with a decision](https://brand.getshared.ai/brand#dataviz-stacked-bars)

Use 100% stacked bars to compare proportions across groups with different totals. Label the numerator and denominator so readers can judge the sample size.

Source: fictional Open Studio pilot · November 2026 · 24 draft reviews


##### [Most reviews took 25 minutes or less](https://brand.getshared.ai/brand#dataviz-dot-plot)

Use a dot plot for a small sample to show each observation. Stack repeated values and use a shared horizontal scale.

Source: fictional review sample · November 2026 · minutes

- Minutes ∣ Reviews

- 15 ∣ 1

- 20 ∣ 2

- 25 ∣ 3

- 30 ∣ 2

- 35 ∣ 1


#### [Relationships and distribution](https://brand.getshared.ai/brand#dataviz-relationships)

Choose scatter for two numeric measures, dumbbell for paired values, histogram for a continuous distribution, or heatmap for patterns across two dimensions.

Scatterplot


##### [More prep often went with shorter reviews](https://brand.getshared.ai/brand#dataviz-scatter)

Use scatterplots for two numeric measures on the same observations. Each dot is one session. This pattern alone cannot establish causation.

Source: fictional Shared Studio data · Nov 2026 · minutes

- Session ∣ Prep ∣ Review

- 1 ∣ 2 ∣ 34

- 2 ∣ 3 ∣ 30

- 3 ∣ 4 ∣ 31

- 4 ∣ 5 ∣ 24

- 5 ∣ 6 ∣ 23

- 6 ∣ 7 ∣ 27

- 7 ∣ 8 ∣ 18

- 8 ∣ 10 ∣ 16

- 9 ∣ 11 ∣ 19

Dumbbell chart


##### [Review times fell in all three rooms](https://brand.getshared.ai/brand#dataviz-dumbbell)

Connect exactly two points per category on a shared scale. Distinguish the earlier point with an open marker and the later point with a solid marker.

Source: fictional Shared Studio data · Nov 2026 · minutes

- Room ∣ Before ∣ After

- Workshop ∣ 34 ∣ 23

- Studio ∣ 29 ∣ 21

- Library ∣ 27 ∣ 24

Histogram


##### [The busiest duration band was 20–25 minutes](https://brand.getshared.ai/brand#dataviz-histogram)

Use touching, equal-width bins for continuous measurements. State the bin boundaries so observations on an edge are assigned only once.

Source: fictional Shared Studio data · Nov 2026 · reviews per duration bin

- Minutes, upper edge excluded ∣ Count

- 10–\<15 ∣ 2

- 15–\<20 ∣ 4

- 20–\<25 ∣ 8

- 25–\<30 ∣ 6

- 30–\<35 ∣ 3

- 35–\<40 ∣ 1

Heatmap


##### [Midweek at midday was busiest](https://brand.getshared.ai/brand#dataviz-heatmap)

Use one light-to-dark scale across the whole grid. Print the value in every cell so patterns remain legible without colour.

- Day ∣ AM ∣ Midday ∣ PM

- Mon ∣ 1 ∣ 3 ∣ 1

- Tue ∣ 2 ∣ 6 ∣ 4

- Wed ∣ 3 ∣ 8 ∣ 5

- Thu ∣ 2 ∣ 7 ∣ 3

- Fri ∣ 1 ∣ 4 ∣ 2

Source: fictional Shared Studio data · Nov 2026 · bookings

- Day ∣ AM ∣ Midday ∣ PM

- Mon ∣ 1 ∣ 3 ∣ 1

- Tue ∣ 2 ∣ 6 ∣ 4

- Wed ∣ 3 ∣ 8 ∣ 5

- Thu ∣ 2 ∣ 7 ∣ 3

- Fri ∣ 1 ∣ 4 ∣ 2


#### [Targets and uncertainty](https://brand.getshared.ai/brand#dataviz-planning)

Use waterfall for changes to a total, bullet for performance against a target, diverging bars for opposing responses, or intervals for estimates with a range.

Waterfall chart


##### [The open list fell from 12 to 7](https://brand.getshared.ai/brand#dataviz-waterfall)

Anchor the first and last totals at zero. Float each intermediate bar between the running balances. Use signs and fill patterns to show direction.

Source: fictional Shared Studio data · Nov 2026 · open items

- Step ∣ Value

- Opening ∣ 12

- Added ∣ 8

- Closed ∣ -11

- Merged ∣ -2

- Ending ∣ 7

Bullet chart


##### [Studio met its review target](https://brand.getshared.ai/brand#dataviz-bullet)

Place the target tick and actual fill on the same scale. Keep the common zero baseline across categories.

Source: fictional Shared Studio data · Nov 2026 · reviews

- Room ∣ Actual ∣ Target

- Workshop ∣ 9 ∣ 10

- Studio ∣ 8 ∣ 8

- Library ∣ 5 ∣ 6

Diverging bars


##### [Keeping a record drew the most support](https://brand.getshared.ai/brand#dataviz-diverging)

Use the same scale on both sides of the centre. Separate opposing categories with pattern and text, and label the unit as votes.

Source: fictional Shared Studio data · Nov 2026 · votes

- Proposal ∣ Concern ∣ Support

- Share earlier ∣ 2 ∣ 8

- Extend review ∣ 6 ∣ 4

- Keep a record ∣ 1 ∣ 9

Range and estimate


##### [Facilitation had the widest planning range](https://brand.getshared.ai/brand#dataviz-interval)

Plot the low and high values as a line and the estimate as a dot. Name how the range was obtained. These are planning bounds from the workshop team.

Source: fictional Shared Studio data · Nov 2026 · minutes

- Task ∣ Low ∣ Estimate ∣ High

- Facilitate ∣ 14 ∣ 18 ∣ 28

- Synthesize ∣ 8 ∣ 12 ∣ 20

- Follow up ∣ 4 ∣ 7 ∣ 13


#### [Diagrams](https://brand.getshared.ai/brand#dataviz-diagrams)


##### [From draft to decision](https://brand.getshared.ai/brand#dataviz-diagrams)

Use labelled nodes for actions and directional connectors for sequence. Stack the steps vertically on narrow screens. Label decision branches with their conditions.

- 01 Bring the draft

- 02 Review together

- 03 Record the decision


#### [Timelines and decision branches](https://brand.getshared.ai/brand#dataviz-timeline)


##### [From pilot to January review](https://brand.getshared.ai/brand#dataviz-timeline)

For a milestone list, print the dates and use equal spacing to group events in reading order. Use a proportional time axis when elapsed time is the point.

- 6 NovPilot opens

- 20 NovThird pilot session

- 29 JanExpansion review


##### [Can the group decide today?](https://brand.getshared.ai/brand#dataviz-timeline)

Write decision nodes as questions. Put conditions on both branches and carry each to a named action.

Is the decision-maker in the room?

- Yes Record the decision and owner.

- No Book a follow-up with the decision-maker.


#### [Charts with photography](https://brand.getshared.ai/brand#dataviz-in-context)


##### [Pair an image with a finding](https://brand.getshared.ai/brand#dataviz-in-context)

Use a documentary image to show the activity behind the numbers. Put measures, labels and source notes on a solid surface beside or below the photograph. This example carries the 18 recorded decisions from the pilot report.

18 of 24 reviews ended with a decision.


#### [Ledger dashboards](https://brand.getshared.ai/brand#dataviz-ledger)

These examples cover conversion, metering, capacity and time-based operational data. All values are synthetic.

See coverage by Ledger page

Conversion funnel


##### [One in four arrivals built an app](https://brand.getshared.ai/brand#dataviz-ledger-funnel)

Keep the cohort and window fixed. Label each count and each share of the starting cohort. Explain skipped stages before comparing rates.

Source: synthetic Ledger example data

- Category ∣ People

- Arrived ∣ 120

- Started sign-in ∣ 78

- Opened workspace ∣ 48

- Built an app ∣ 30

Absolute stacked columns


##### [Recorded usage peaked on 20 November](https://brand.getshared.ai/brand#dataviz-ledger-stacked-time)

Use a shared zero baseline for totals over time. Use mutually exclusive components and preserve missing or partial periods.

0–100 thousand tokens

Source: synthetic Ledger example data

- Category ∣ Input ∣ Cache ∣ Output

- 17 Nov ∣ 32 ∣ 19 ∣ 12

- 18 Nov ∣ 44 ∣ 14 ∣ 19

- 19 Nov ∣ 37 ∣ 17 ∣ 23

- 20 Nov ∣ 56 ∣ 20 ∣ 16

Composition donut


##### [Input accounted for just over half of recorded tokens](https://brand.getshared.ai/brand#dataviz-ledger-donut)

Keep segments mutually exclusive and show a total and labelled proportions. Use ranked bars when precise comparisons matter.

Source: synthetic Ledger example data

- Category ∣ Tokens (000s)

- Input ∣ 54

- Cache read ∣ 27

- Cache write ∣ 6

- Output ∣ 13

Coverage stack


##### [Rooms had the most receipts with missing counts](https://brand.getshared.ai/brand#dataviz-ledger-coverage)

Show the total number of receipts. Label measured, estimated and missing counts distinctly. Treat missing counts as unavailable.

Source: synthetic Ledger example data

- Category ∣ Measured ∣ Estimated ∣ Missing count

- Web ∣ 24 ∣ 3 ∣ 2

- Rooms ∣ 18 ∣ 4 ∣ 5

- Meet ∣ 12 ∣ 1 ∣ 1

Quota and forecast


##### [Current pace would exceed the monthly cap](https://brand.getshared.ai/brand#dataviz-ledger-quota)

Place observed usage, forecast and hard limit on one scale. Hatch the projection and state its basis. This example extends the last seven days’ pace.

Participant minutes · solid = observed · hatch = projected additional

Source: synthetic Ledger example data

- Category ∣ Participant minutes

- Observed · people ∣ 2100

- Observed · agents and recorders ∣ 1100

- Forecast additional ∣ 2200

- Monthly limit ∣ 5000

Duration lanes


##### [The review and Council activity overlapped](https://brand.getshared.ai/brand#dataviz-ledger-lanes)

Use one proportional time axis across lanes. Position blocks by recorded start and end, preserve overlaps and label the time zone.

Europe/Madrid · lengths show elapsed time

Source: synthetic Ledger example data

- Category ∣ Start ∣ End

- Live call ∣ 09:15 ∣ 10:00

- Review ∣ 10:00 ∣ 11:30

- Council ∣ 11:15 ∣ 12:15

Logarithmic bubble plot


##### [Model D had the highest output and receipt count](https://brand.getshared.ai/brand#dataviz-ledger-log-bubble)

Use labelled logarithmic axes for positive values spanning orders of magnitude. Size bubbles by area. Report zero and missing records in the accompanying table.

Output tokens (000s, log₂)

Prompt tokens (000s, log₂) · bubble area = receipt count

Source: synthetic Ledger example data

- Category ∣ Prompt (000s) ∣ Output (000s) ∣ Receipts

- Model A ∣ 16 ∣ 4 ∣ 40

- Model B ∣ 32 ∣ 2 ∣ 20

- Model C ∣ 64 ∣ 8 ∣ 55

- Model D ∣ 128 ∣ 16 ∣ 95

- Model E ∣ 256 ∣ 8 ∣ 65

Telemetry ranges and threshold


##### [RAM reached the alert threshold around midday](https://brand.getshared.ai/brand#dataviz-ledger-telemetry)

Name the aggregation window and the threshold. Label measured min–max separately from forecast uncertainty. Mark unavailable periods explicitly.

RAM used (0–100%)

Dot = hourly average · bar = observed min–max · hatch = unavailable

Source: synthetic Ledger example data

- Category ∣ Mean % ∣ Low % ∣ High %

- 09:00 ∣ 61 ∣ 54 ∣ 72

- 10:00 ∣ 74 ∣ 62 ∣ 80

- 11:00 ∣ 79 ∣ 69 ∣ 87

- 12:00 ∣ 87 ∣ 80 ∣ 92

- 13:00 ∣ Unavailable ∣ Unavailable ∣ Unavailable

- 14:00 ∣ 72 ∣ 64 ∣ 78

Stacked area


##### [Working memory drove the midday peak](https://brand.getshared.ai/brand#dataviz-ledger-stacked-area)

Use a common zero baseline for composition over time. Keep cumulative layers in one order. Leave a gap whenever the full stack is unavailable.

0–20 GiB · one height per period

Source: synthetic Ledger example data

- Category ∣ Working ∣ Reclaimable cache ∣ Other

- 08:00 ∣ 8 ∣ 4 ∣ 1

- 10:00 ∣ 9 ∣ 3 ∣ 1

- 12:00 ∣ 12 ∣ 2 ∣ 2

- 14:00 ∣ 11 ∣ 3 ∣ 1

- 16:00 ∣ 9 ∣ 4 ∣ 1

Status rows with sparklines


##### [One collector’s readings are stale](https://brand.getshared.ai/brand#dataviz-ledger-sparklines)

Keep sparklines on the same scale when comparing rows. Put current, stale or unavailable beside each trend. Give the time window and last successful update in the detail view.

CPU used · same 0–100% scale

Source: synthetic Ledger example data

- Category ∣ 08:00 % ∣ 10:00 % ∣ 12:00 % ∣ 14:00 % ∣ 16:00 % ∣ Status

- Collector A ∣ 68 ∣ 65 ∣ 73 ∣ 79 ∣ 72 ∣ Current

- Collector B ∣ 31 ∣ 24 ∣ 25 ∣ 30 ∣ 28 ∣ Stale

- Collector C ∣ Unavailable ∣ Unavailable ∣ Unavailable ∣ Unavailable ∣ Unavailable ∣ Unavailable


#### [Ledger page coverage](https://brand.getshared.ai/brand#dataviz-ledger-coverage-map)

Operations, Health, Resources

- Status cards, sparklines, thresholds and capacity. Label current value, time window and the last successful update.

Usage and its breakdowns

- Ranked bars for groups, seats, agents, calls and apps; log bubbles for models; stacked period totals, composition, weekday and channel heatmaps, and receipt coverage.

Metrics, Funnel, Tickets & velocity

- Daily counts, conversion funnels, rankings, open-ticket age distribution and elapsed delivery summaries. Identify the cohort and separate throughput from time spent.

Workhours and MuseTalk

- Proportional activity and call durations, workday bars, weekday and hour heatmaps, and agent-by-day comparisons. Identify time zones and separate metered records from estimates.

Memory and Storage

- Stacked composition and trend areas, range bands, event markers, per-row sparklines and used-versus-capacity bars. Distinguish free space, reclaimable memory and other categories.

LiveKit

- Observed and projected minutes against a limit, stacked daily volume, and participant breakdowns. Label future periods and estimated baselines separately.

Activity, Errors, Mail and Watchdog

- Timestamped records, linked details, and explicit status and freshness. Use counts where the underlying record coverage is known.

Sandbox, Docs and demo libraries

- Status cards, inventories and linked records work for configuration and editorial content. Use diagrams when a dependency or relationship needs explanation.

Make interactive marks reachable by keyboard and touch. Keep selection and exact values visible outside the plot. Update data tables and CSV when filters change. Distinguish observed zero, unavailable, stale, estimated, and future periods.


### [Assets](https://brand.getshared.ai/brand#panel-assets)

Download master artwork, fonts, source styles and starter files for Shared projects.


#### [Identity](https://brand.getshared.ai/brand#assets-identity)

- Shared wordmarkSVG · square-grid master

- Compact markSVG · small spaces and app icons

- Identity referencePDF · visual identity studies


#### [Type and tokens](https://brand.getshared.ai/brand#assets-type)

- Foundation tokensCSS · colour, scale, spacing and controls

- Instrument SerifWOFF2 · display headings

- InterWOFF2 · body and form text

- JetBrains MonoWOFF2 · links, controls and data labels


#### [Icons and glyphs](https://brand.getshared.ai/brand#assets-icons)

- Core pixel icon kitZIP · flat and textured SVGs

- Expanded pixel collectionZIP · 10,000 SVGs, paper sprite and CSV index

- Pixel icon catalogBrowse the collection

- Sketch mode glyph catalogBrowse built-in glyphs and their exact keys


#### [Photography and cutouts](https://brand.getshared.ai/brand#assets-photography)

- Campaign photographyZIP · full-width JPGs

- Group photographyZIP · group studies

- Agent cutoutsZIP · transparent PNGs

- Open Studio workshop photoJPG · used on the live-call deck

- Open Studio poster photoWebP · portrait event artwork

- Photography galleryBrowse campaign and editorial imagery


#### [Templates and guidance](https://brand.getshared.ai/brand#assets-templates)

- Shared artifact startersZIP · editable HTML, deck outline, photography and plain-text email

- Artifact specimensPDF report, contract, email, slides, poster and invoice

- Industry event poster collectionPDF · ten A3 event posters

- Instagram event kitZIP · 14 feed and Story PNGs, with captions and alt text

- Navigation patternsDesktop and mobile header, tabs and links

- Dataviz stylesheetCSS · charts and diagrams

- Design referenceMarkdown · generated from the saved Studio pages


#### [Campaign cast](https://brand.getshared.ai/brand#assets-campaign-cast)

Download the 39 original portraits used as references in the Shared industry photography. Each portrait keeps its library ID.

Open the Agent Portraits library

- AissatouV107

- AmaraV47

- AndrejV136

- AnoukV117

- AramV462

- ArjunV445

- ArloV48

- BahramV153

- BaoV121

- ChidiV457

- CitlaliV127

- DawaV118

- DevV19

- DimitriV110

- ElijahV470

- IrisV34

- IshaanV132

- JaeV500

- KaiV6-redo

- KeanuV134

- LaylaV480

- LucaV23

- MayaV1

- MazinV138

- MinV38

- NahlaV115

- NoahV503

- NoeliaV123

- OzanV112

- PloyV426

- SaanviV111

- SadeV436

- SakinaV135

- SeoyeonV109

- SorayaV418

- SorenV128

- TylerV501

- XimenaV491

- ZoyaV139

## Artifacts

[Open the working examples](https://brand.getshared.ai/artifacts)

A complete set of materials for the Open Studio workshop.

4 phone pages · 9:16


### [Open Studio pilot review](https://brand.getshared.ai/artifacts#panel-report)

Open Studio pilot report


#### [Make the work visible.](https://brand.getshared.ai/artifacts#panel-report)

One draft, one decision, and one owner in every review.


#### [Expand the pilot.](https://brand.getshared.ai/artifacts#panel-report)

Run the format with two more teams through January. Keep each review focused on one draft and one decision.

Drafts reviewed

- 24

Decisions recorded

- 18

Median review

- 22 min

18 decided · 6 open

Fictional programme data · 6–20 Nov 2026


#### [A decision in the room.](https://brand.getshared.ai/artifacts#panel-report)

18 of 24 reviews ended with a decision and a named owner. Five open items depended on someone who was absent.


##### [Decisions by session](https://brand.getshared.ai/artifacts#panel-report)

Fictional programme data · November 2026


#### [Check back on 29 January.](https://brand.getshared.ai/artifacts#panel-report)

Nora Vale will compare decisions recorded and median review time before proposing a permanent weekly slot.


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-report)

The phone PDF uses a 9:16 page, 13pt body text and four short screens. Use the two-page A4 edition for print. The photo shows a draft review. A proportion bar summarizes decisions across the pilot, and a second chart compares the three sessions.

Instrument Serif at display scale, a lemon decision block, cobalt metric labels and a directly labelled outcomes chart. Keep the mark on the cover and the folio on each page.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-report)

At 320 px, some chart labels and folios in the phone preview fell to about 8 px.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-report)

The browser preview uses a 16 px body-text floor and a 12 px metadata and chart-label floor. Folios can move down when the text needs more room.

A4 portrait · 1 page


### [Workshop agreement](https://brand.getshared.ai/artifacts#panel-contract)

Studio services / 27 November 2026


#### [Workshop agreement.](https://brand.getshared.ai/artifacts#panel-contract)

Studio

- Shared Studio Programme lead · Nora Vale

Client

- Fieldwork Design Co. Project lead · Ellis Rowan

- ScopeShared Studio will facilitate one 90-minute draft review on 4 December 2026. The studio will supply printed working materials and deliver a two-page decision summary by 8 December.

- Client responsibilitiesFieldwork will name one decision-maker, send the current draft by 2 December, and confirm any accessibility requirements before the session.

- Fee and changesThe workshop and materials total €780 before tax. Both project leads will confirm any change to the scope or date in writing before work continues.


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-contract)

Keep the parties, scope, fee and signatures on a quiet, numbered page. This fictional agreement is a layout specimen.

Use Inter for terms, JetBrains Mono for numbering and metadata, and ink rules for signatures. Reserve the display serif for the title. Keep both sample signatures and their printed names together on the A4 page.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-contract)

Scaling the whole A4 sheet reduced the terms to about 7 px and the signature captions to about 4 px at 390 px.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-contract)

The browser preview reflows at narrow widths, with 16 px terms and signatures stacked on phones. The print download keeps its single A4 page.

HTML + plain text


### [Participant reminder](https://brand.getshared.ai/artifacts#panel-email)

From

- Lola, Shared Studio

To

- Open Studio participants

Subject

- Bring one unfinished draft on Friday

Open Studio · 4 December


#### [See you in the studio.](https://brand.getshared.ai/artifacts#panel-email)

Hi everyone,

Bring one unfinished draft to Open Studio this Friday. We’ll put it on the table, spend 20 minutes on one decision, and leave the next move with a named owner.

Friday, 4 December · 14:00–15:30 CET

Shared Studio · Room 02

Bring the draft you want to move forward.

See the workshop details

See you there,

Shared Studio agent


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-email)

State what to bring and when the room opens in the first screen. Keep one link to the event details and use a text version alongside the HTML.

Use the wordmark at the top of the message, a mint event block, Inter for the body and one underlined JetBrains Mono link. Use Shared neon yellow behind the agent’s portrait and keep the name and role as live text. The HTML email download includes the flattened portrait, PNG icons and an inline-styled layout.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-email)

The signature and body must stay readable when the email is viewed in a narrow pane or with images blocked.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-email)

Keep the sender’s identity and event information in live text. The preview sets a 13 px minimum for envelope and signature labels.

Live-call deck · 4 slides · 16:9


### [Make the work visible](https://brand.getshared.ai/artifacts#panel-slides)


#### [Make the work visible](https://brand.getshared.ai/artifacts#panel-slides)

Open Studio · December 2026


#### [Put the draft on the table](https://brand.getshared.ai/artifacts#panel-slides)

Before the review

Bring one unfinished draft

Around the table

Mark the choice the group needs to make


#### [Give the group something to move](https://brand.getshared.ai/artifacts#panel-slides)

Lay the options out side by side. Move one piece to show what you would change.

Workshop photograph: three colleagues pass a cobalt felt square across a worktable.


#### [Leave with one next move](https://brand.getshared.ai/artifacts#panel-slides)

Record the decision

Name the owner

Set a date to review the next draft


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-slides)

The deck moves from the invitation to a comparison, a workshop photograph and a closing checklist. Step through it as you would on the live-call stage.

The hfs2s deck store paints the slides using warm gridded paper, tactile cutouts and sparse cobalt accents. The official hfs2s mark sits on the cover. Each slide has a readable transcript below.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-slides)

Slides are rendered as 16:9 images. On a phone, the image can make slide lettering too small to read.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-slides)

Every slide has a transcript in live text at 16 px, with a 44 px disclosure target.

A3 portrait · 10 industries


### [Posters for ten events](https://brand.getshared.ai/artifacts#panel-poster)

Software & creative · Prototyping workshop


#### [Open Studio](https://brand.getshared.ai/artifacts#panel-poster)

Bring a rough draft.

Work through one idea together.

Date

- Friday, 4 December 2026

Time

- 14:00–15:30 CET

Venue

- Shared Studio · Room 02

Host

- Shared Studio

- BaoV121

Architecture & construction · Site briefing


#### [Site Handover](https://brand.getshared.ai/artifacts#panel-poster)

Walk the plan before work starts.

Review access, sequence and responsibilities.

Date

- Tuesday, 8 December 2026

Time

- 09:00–10:00 CET

Venue

- Model Room · North Workshop

Host

- North Workshop

- Access routes

- Work sequence

- Team handoff

- KeanuV134

- IrisV34

Education & libraries · Student exhibition


#### [Work in Progress](https://brand.getshared.ai/artifacts#panel-poster)

Meet the makers behind the work.

Student projects, prototypes and short talks.

Date

- Thursday, 10 December 2026

Time

- 16:30–19:00 CET

Venue

- Learning Commons · Gallery 1

Host

- Learning Commons

- AnoukV117

- JaeV500

- ElijahV470

Healthcare & accessibility · Peer roundtable


#### [Better Handoffs](https://brand.getshared.ai/artifacts#panel-poster)

Bring one handoff that needs a rethink.

A discussion using fictional care scenarios.

Date

- Friday, 11 December 2026

Time

- 12:00–13:00 CET

Venue

- Learning Lab · Table 3

Host

- Care Learning Lab

- Bring one handoff

- Compare two approaches

- Take home a next step

- ZoyaV139

Food & hospitality · Hospitality tasting


#### [Table for Everyone](https://brand.getshared.ai/artifacts#panel-poster)

Take a seat at the tasting table.

Small plates and a conversation about service.

Date

- Saturday, 12 December 2026

Time

- 17:00–19:00 CET

Venue

- Terrace Kitchen · Courtyard

Host

- Terrace Kitchen

- LaylaV480

- SaanviV111

Climate & agriculture · Community seed swap


#### [The Seed Exchange](https://brand.getshared.ai/artifacts#panel-poster)

Bring a packet, take a packet.

Trade seeds and share growing notes.

Date

- Sunday, 13 December 2026

Time

- 11:00–14:00 CET

Venue

- Glasshouse · Seed Library

Host

- Seed Library Network

- Bring labelled seeds

- Swap and share growing notes

- XimenaV491

Manufacturing & logistics · Technical demonstration


#### [The Repair Bench](https://brand.getshared.ai/artifacts#panel-poster)

Follow a part through the repair process.

Watch the inspection and handoff demonstration.

Date

- Tuesday, 15 December 2026

Time

- 10:00–11:30 CET

Venue

- Making Lab · Bench 4

Host

- Making Lab

- 10:00 · Inspect

- 10:25 · Repair

- 11:05 · Check

- SakinaV135

- AndrejV136

- AissatouV107

Retail & consumer goods · Packaging showcase


#### [On the Shelf](https://brand.getshared.ai/artifacts#panel-poster)

See how the package works in hand.

Compare materials, labels and opening tests.

Date

- Wednesday, 16 December 2026

Time

- 18:00–20:00 CET

Venue

- Market Hall · Sample Room

Host

- Market Hall Design Office

- LucaV23

Arts & media · Live recording


#### [On Air](https://brand.getshared.ai/artifacts#panel-poster)

Watch a segment come together live.

A public recording with a short audience Q&A.

Date

- Friday, 18 December 2026

Time

- 19:30–20:30 CET

Venue

- Sound Room · Studio B

Host

- Sound Room Collective

- Live segment

- Audience Q&A

- MinV38

- AmaraV47

Civic & community services · Neighbourhood walk


#### [A Clear Path](https://brand.getshared.ai/artifacts#panel-poster)

Walk the route and mark what gets in the way.

Share access observations with the group.

Date

- Saturday, 19 December 2026

Time

- 10:00–11:30 CET

Venue

- Meet at the park entrance

Host

- Neighbourhood Access Group

- Meet at the entrance

- Walk and note barriers

- Share observations

- PloyV426

- ArjunV445


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-poster)

Each event uses one full-page photograph with one to three agents from the portrait library. Choose the headline position and information density to suit both the event and its photograph.

Run the photograph edge to edge. Place editable text directly on naturally quiet areas and use spacing to group details. Use a single line of logistics for a simple event, a compact agenda for a briefing, or separate date and venue blocks when the audience will scan for them.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-poster)

The web preview and A3 download rendered the headlines in different fonts. Long dates wrapped into several lines in the briefing and walk posters. Fine copy over tableware had low contrast.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-poster)

The gallery uses images of the A3 export. Select a poster to inspect it full size. Short dates, clearer spacing, and a quieter foreground keep the event details readable. Complete event information is also available in live text.

A4 portrait · 1 page


### [Workshop invoice](https://brand.getshared.ai/artifacts#panel-invoice)

Open Studio / Programme services


#### [Invoice.](https://brand.getshared.ai/artifacts#panel-invoice)

Invoice number

- SS-2026-026

Issued

- 8 Dec 2026

Due

- 7 Jan 2027

From

- Shared Studio Programme accounts

Bill to

- Fieldwork Design Co. Project accounts

- Description ∣ Qty ∣ Rate ∣ Amount

- Facilitation ∣ 1 ∣ €600.00 ∣ €600.00

- Working materials ∣ 12 ∣ €15.00 ∣ €180.00

Subtotal

- €780.00

Example VAT (21%)

- €163.80

Total (EUR)

- €943.80

Payment reference · SS-2026-026


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-invoice)

Put the currency, reference, due date and total near the top. Align amounts on the right and group the subtotal, tax and total under the line items.

Use the same wordmark and folio placement as the agreement. For A4, keep the total and payment reference on the same page as the ruled line items. Use lemon to highlight the total.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-invoice)

At 390 px, the scaled A4 preview showed regular text at about 7 px and dates and references at about 5 px.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-invoice)

The narrow browser view reflows the metadata and line items. Body text is 16 px, and the table is 14 px. The print download remains A4.

Instagram · 14 exports


### [Ten events on Instagram](https://brand.getshared.ai/artifacts#panel-social)


#### [Open Studio Instagram campaign](https://brand.getshared.ai/artifacts#panel-social)


##### [Open Studio carousel · 1 of 3](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

Open Studio

Make the work visible.

Three cards walk through the format.

4 December · 14:00–15:30 CET · Shared Studio · Room 02

Hosted by Shared Studio


##### [Open Studio carousel · 2 of 3](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

Open Studio

Bring one rough draft.

Choose a draft and write down the decision you need to make. Bring both to the room.

4 December · 14:00–15:30 CET · Shared Studio · Room 02

Hosted by Shared Studio


##### [Open Studio carousel · 3 of 3](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

Open Studio

Leave with one next move.

Record the decision, name the owner and choose a date to review the next draft.

4 December · 14:00–15:30 CET · Shared Studio · Room 02

Hosted by Shared Studio


##### [Open Studio save the date](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1080 px

Open Studio

4 December.

Save the date for Open Studio.

4 December · 14:00–15:30 CET · Shared Studio · Room 02

Hosted by Shared Studio


##### [Open Studio reminder Story](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1920 px

Open Studio

Bring your draft today.

Open Studio starts at 14:00 CET. Bring the draft you want to move forward.

4 December · 14:00–15:30 CET · Shared Studio · Room 02

Hosted by Shared Studio


#### [Nine more event posts](https://brand.getshared.ai/artifacts#panel-social)


##### [Arrival guide](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

Site Handover

Before work starts.

Meet in the model room. Bring the current access plan.

8 December · 09:00–10:00 CET · Model Room · North Workshop

Hosted by North Workshop


##### [Exhibition teaser](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1920 px

Work in Progress

Meet the makers.

Student prototypes and short talks.

10 December · 16:30–19:00 CET · Learning Commons · Gallery 1

Hosted by Learning Commons


##### [Discussion prompt](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1080 px

Better Handoffs

What slows a handoff?

Bring a fictional example or write one question.

11 December · 12:00–13:00 CET · Learning Lab · Table 3

Hosted by Care Learning Lab


##### [Event invitation](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

Table for Everyone

Take a seat.

A tasting of small plates and a conversation about service.

12 December · 17:00–19:00 CET · Terrace Kitchen · Courtyard

Hosted by Terrace Kitchen


##### [What to bring](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1080 px

The Seed Exchange

- A seed packet

- Variety and year

- One growing note

Bring a packet.

Label your seeds with variety and year.

13 December · 11:00–14:00 CET · Glasshouse · Seed Library

- A seed packet

- Variety and year

- One growing note

Hosted by Seed Library Network


##### [Agenda Story](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1920 px

The Repair Bench

- 10:00 · Inspect

- 10:25 · Repair

- 11:05 · Check

Inside the repair bench.

Three steps at the Making Lab.

15 December · 10:00–11:30 CET · Making Lab · Bench 4

- 10:00 · Inspect

- 10:25 · Repair

- 11:05 · Check

Hosted by Making Lab


##### [Maker spotlight](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1350 px

On the Shelf

Meet Luca.

See how this carton opens, folds and fits on a shelf.

16 December · 18:00–20:00 CET · Market Hall · Sample Room

Hosted by Market Hall Design Office


##### [Reminder Story](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1920 px

On Air

On air tonight.

A live segment followed by audience Q&A.

18 December · 19:30–20:30 CET · Sound Room · Studio B

Hosted by Sound Room Collective


##### [Venue card](https://brand.getshared.ai/artifacts#panel-social)

1080 × 1080 px

A Clear Path

Walk it together.

Wear walking shoes.

19 December · 10:00–11:30 CET · Meet at the park entrance

Hosted by Neighbourhood Access Group


#### [Layout notes](https://brand.getshared.ai/artifacts#panel-social)

Preview a three-card carousel, event invitations, reminders, arrival guides, a spotlight and a checklist. The collection includes square and portrait feed posts plus vertical Stories.

Carry the photograph and palette into social. Use compact Inter headlines with a looser line height and leave room between the headline and event details. Keep every face fully in frame and free of text, logos, and other overlays. Review each crop at its final export size. Leave space at the top and bottom of Stories for viewer controls.


##### [Design QA](https://brand.getshared.ai/artifacts#panel-social)

At desktop gallery size, event details rendered near 8 px and carousel numbering near 6 px. Text also shrank when the posts were fit to a phone screen.


##### [Fixes applied](https://brand.getshared.ai/artifacts#panel-social)

The PNGs use larger details, captions and carousel numbers. Each card offers readable post text and a full-size PNG. Story copy bands run edge to edge, with faces kept fully visible and clear of copy.

## Components

[Open the working examples](https://brand.getshared.ai/components)

Working UI examples for Shared products, from common controls to generative interfaces.


### [Pages](https://brand.getshared.ai/components#page-patterns)

Combine navigation, content, and controls into complete workspaces, collections, detail pages, and settings.

Open page patterns

- Page anatomy

- Elio Live workbench

- Agent portraits and contact points

- Collection

- Detail view

- Settings


### [Talk](https://brand.getshared.ai/components#talk-experience)

Build a conversation around the agent, a clear turn indicator, captions, and a way to type.

Try the talk experience

- Interactive call

- Call states

- Talk and workbench layouts


### [Flows](https://brand.getshared.ai/components#compound-flows)

Assemble common tasks from Shared controls and decide what happens at each step.

Open compound patterns

- Elio Rooms lobby and viewer

- Find work

- Review a decision

- Recover work


### [Generative UI](https://brand.getshared.ai/components#generative-ui)

Explore working examples of model-generated interfaces, their component schema, and how they handle loading and feedback.

Open the Generative UI library

- Component examples

- Generation and rendering states

- View schema


#### [Controls](https://brand.getshared.ai/components#controls)

Buttons, selectors, menus, and keyboard interactions.

Open component specifications


#### [Forms](https://brand.getshared.ai/components#forms)

Labels, input fields, validation, and choice controls.

Open form examples

## Page patterns

[Open the working examples](https://brand.getshared.ai/components/pages)

Complete layouts for live work, collections, item details, and settings.


### [Page anatomy](https://brand.getshared.ai/components/pages#page-anatomy)

Give every page a predictable reading order. Use the same page frame when the layout changes from a collection to a detail view or settings.

- Shared shellProvide the skip link and product navigation. Highlight the current section and keep deep links shareable.

- Page headingUse one page title. Add a parent link when the page is nested and put the main action beside the title, or just below it on phones.

- Local navigationUse the shared menu for peer views. Keep the active label visible and place its content immediately below.

- Main contentUse one labelled main landmark. Give the primary content the available width, then place optional context beside it or below it on phones.

- Feedback and recoveryKeep loading, empty, error, and success messages in the region they describe. Preserve context, choices, and drafts when someone retries.

Use the Shared width, gutter, section spacing, and control-height tokens. Keep visual, reading, and keyboard order aligned at every width. Add a footer where the surface needs persistent secondary links.


### [Elio Live workbench](https://brand.getshared.ai/components/pages#live-workbench)

Give Elio and the work their own space. Open on Stage and keep the composer available in Stage and Chat.


#### [Stage](https://brand.getshared.ai/components/pages#live-workbench)


##### [Launch review](https://brand.getshared.ai/components/pages#work-canvas)

- Choose the lead photograph.

- Assign the first edit.

- Share the approved draft.


##### [From draft to launch](https://brand.getshared.ai/components/pages#work-sketch)

- Choose a photo

- Make the edit

- Publish the draft

- ElioI’ve put the launch brief on Stage. Which lead photograph should we use?

Stack the portrait above the work area on phones. Keep the composer and call controls in the same place as views change. New material can bring Stage forward when it leaves an active draft or dialog undisturbed. Messages in this preview stay in sample Chat.


### [Agent portraits and contact points](https://brand.getshared.ai/components/pages#agent-identity)

Use Shared neon yellow (--lemon, #F4F56E) behind agent portraits. Pair the portrait with the agent’s name and a useful role or state.


#### [Call tile](https://brand.getshared.ai/components/pages#agent-identity)


#### [Email signature](https://brand.getshared.ai/components/pages#agent-identity)


#### [Contact card](https://brand.getshared.ai/components/pages#agent-identity)

Use a transparent portrait over the token on web surfaces. For email, export the crop with the yellow baked into the image, and keep the name and role in live text so they remain readable with images off. Use a written label for call state. See the email specimen.


### [Collection](https://brand.getshared.ai/components/pages#collection)

Help people scan related work and find the next item to open.


#### [Campaign rooms](https://brand.getshared.ai/components/pages#collection)

- Spring launchCreative · Updated todayIn review

- Studio open houseEvents · Updated yesterdayDraft

- Field recordingsProduction · Updated TuesdayReady

Give each entry a clear title, one useful line of metadata, and a written status when the workflow has distinct states.


### [Detail view](https://brand.getshared.ai/components/pages#detail)

Put the title, current state, and next decision ahead of supporting information.


#### [Spring launch](https://brand.getshared.ai/components/pages#detail)


##### [Choose the lead photograph](https://brand.getshared.ai/components/pages#detail)

The creative team is reviewing two selects. The final image is due for layout on Thursday.

Owner

- Creative studio

Due

- Thursday, 18 March

Give supporting metadata stable labels. Use a breadcrumb or collection link so people can return to the list.


### [Settings](https://brand.getshared.ai/components/pages#settings)

Group related controls and explain permissions where people make the choice.


#### [Room settings](https://brand.getshared.ai/components/pages#settings)

Invited people need to sign in with the address on their invitation.

Use Inter for field labels and values. Keep permission help beside its field. Changes in this specimen reset when you leave the page.

## Talk experience

[Open the working examples](https://brand.getshared.ai/components/talk)

Give people a clear way to start a conversation, take a turn, and keep going if voice is unavailable.


### [Interactive call](https://brand.getshared.ai/components/talk#talk-demo)

Try a sample call with Elio. The preview uses scripted replies and needs no microphone.


#### [Talk with Elio](https://brand.getshared.ai/components/talk#talk-demo)

Ask about the Open Studio programme.

Turns appear here once the call starts.

Open captions with the first spoken reply. Keep a transcript available without moving focus on new turns. Announce meaningful state changes once and keep the current turn visible in text.


### [Call states](https://brand.getshared.ai/components/talk#call-states)

Use the same language and controls wherever people talk to an agent.

Ready → Connecting

- Show the agent and the reason to start. Ask for audio access after a deliberate action and show progress while connecting.

Your turn → Listening

- Show when the mic is open with a text label and a clear way to stop listening. Keep typing in reach.

Thinking → Speaking

- Keep the last turn visible while thinking. Caption the reply as it plays and provide an interruption control.

Microphone blocked

- Explain how to allow the microphone and leave the typing path ready.

Reconnecting

- Keep the transcript and any typed draft. Offer a retry if reconnecting needs help, and keep End call in reach.

Call ended

- Show the ended state, leave the transcript available when policy permits, and make a fresh call an explicit action.


### [Talk and workbench layouts](https://brand.getshared.ai/components/talk#call-layout)

Use Talk for a conversation. Add a workbench when the agent and the person need to look at the same material.


#### [Talk](https://brand.getshared.ai/components/talk#call-layout)

- Agent and turnKeep the agent identity and the current state together.

- Captions and controlsPut captions above the mic, typing and end controls. Keep the controls reachable as captions wrap.

- TranscriptGive it a stable disclosure below the call controls.


#### [Live workbench](https://brand.getshared.ai/components/talk#call-layout)

- Agent and call statePut the agent name and call state with the portrait.

- Stage and ChatOpen on Stage. Give the work most of the space and let people switch to Chat in the same region.

- Composer and call controlsKeep the composer available in both views and position the call controls below the workbench.

Try the Elio Live workbench · Try the Elio Rooms lobby · Read the agent portrait standard

## Compound flows

[Open the working examples](https://brand.getshared.ai/components/flows)

Working patterns for the steps people take across Shared pages.


### [Elio Rooms lobby and viewer](https://brand.getshared.ai/components/flows#join-room)

Start with the room and device choices. Keep the same viewer when people enter, change views, or turn on captions.


#### [Spring launch review](https://brand.getshared.ai/components/flows#join-room)


##### [Shared viewer](https://brand.getshared.ai/components/flows#join-room)

Join to see who’s here and what Elio shares.

You · Camera off


##### [Launch review](https://brand.getshared.ai/components/flows#room-stage)

Choose a lead photograph for the first draft.

Elio · Let’s start with the launch brief.


##### [Guest lobby](https://brand.getshared.ai/components/flows#join-room)

Sam Rivera Waiting in the lobby

Keep the call controls under the viewer in People and Stage. Keep the agent’s portrait visible in both views. Confirm guest actions against the named person and show the outcome on their row. If device access fails, explain why and offer a muted route into the room. This preview uses sample participants and device states.


### [Find work](https://brand.getshared.ai/components/flows#find-work)

Combine search, filters, result counts, and a useful empty state.


#### [Campaign rooms](https://brand.getshared.ai/components/flows#find-work)

- Spring launchCreative · Updated todayIn review

- Studio open houseEvents · Updated yesterdayDraft

- Field recordingsProduction · Updated TuesdayReady


##### [No matching rooms](https://brand.getshared.ai/components/flows#find-work)

Try another name or clear your filters.

Keep controls in place as the list changes. When a filtered list is empty, make it easy to reset it. When a collection has no items yet, offer the relevant create or import action.


### [Review a decision](https://brand.getshared.ai/components/flows#review-decision)

Put the item, review choices, rationale, and confirmation in one place.


#### [Spring launch brief](https://brand.getshared.ai/components/flows#review-decision)

Show the version under review. Require a note when asking for changes and announce the outcome after saving. If saving fails, keep the decision and note.


### [Recover work](https://brand.getshared.ai/components/flows#recover-work)

Pair a specific problem with the next action and keep the work in reach.


#### [Field recording notes](https://brand.getshared.ai/components/flows#recover-work)


##### [Summary couldn’t load](https://brand.getshared.ai/components/flows#recover-work)

Your recording is available. Try loading the summary again.

Open Studio · 12 minutes · Recorded Tuesday

Retry only the part that failed. Show progress in that region and return the result in place. Keep the recording or other usable material accessible throughout.

## Nav

[Open the working examples](https://brand.getshared.ai/brand#navigation)

Use headers for main destinations, sidebars for app sections and chapters, and local tabs for views inside a section.


### [Side navigation](https://brand.getshared.ai/brand#nav-sidebars)

Use a sidebar when people move between sections of an app or chapters of a document. Keep the current destination visible as the content changes.


### [App sidebar](https://brand.getshared.ai/brand#nav-app-sidebar)

Group destinations by task, as Elio does with Workspace, Communications, and Manage. Keep the rail visible on wider screens and open it from a compact header on phones.

Elio app


#### [Live](https://brand.getshared.ai/brand#nav-app-sidebar)

Talk to Elio and use the workbench to follow what he shows.

Desktop

- Start with Elio’s 264 px rail. Let the link list scroll independently and keep account details at the foot. Reserve the rail’s space so page content stays aligned.

Current section

- Use a filled row and aria-current="page". Open a collapsed group when it contains the current route. Keep local tabs in the content area.

Phone

- Use a top bar with identity, the current page, and a Menu button. Open the drawer under it. Close it on selection, Escape, or a tap outside. Restore focus to the Menu button when dismissed.


### [Documentation sidebar](https://brand.getshared.ai/brand#nav-doc-sidebar)

Put “On this page” first so readers can jump within the current chapter. List related chapters below and group them by subject.

Systems


#### [Multi-node architecture](https://brand.getshared.ai/brand#nav-doc-sidebar)


##### [Node ownership](https://brand.getshared.ai/brand#doc-nav-ownership)

Give each node an owner who can answer for its services and recover them.


##### [App placement](https://brand.getshared.ai/brand#doc-nav-placement)

Record where each app runs, where it stores state, and who can change the placement.


##### [Release verification](https://brand.getshared.ai/brand#doc-nav-release)

Check the public route, identify the revision it serves, and record the rollback target.

Chapter and section

- Keep chapter links and section links in separate, named navigation landmarks. Mark the active chapter as the current page and the active heading as the current location.

Long chapters

- Keep the rail in reach while the article scrolls. Use a readable article width and update the outline highlight as the reader moves through the article. Give each heading a stable fragment URL.

Phone

- Expand both lists from one Contents control. Collapse it on selection and focus the chosen section so reading can continue there.


### [Desktop header](https://brand.getshared.ai/brand#nav-desktop)

Position the wordmark at the start and keep utility downloads at the end. Use JetBrains Mono at 14px and a 50px target height. Mark the current route with ink text and a 3px cobalt rule. Keep other routes in muted ink with no underline.


### [Mobile header](https://brand.getshared.ai/brand#nav-mobile)

Give the wordmark and download their own row. Put the same ordered routes on a horizontally scrolling rail below, with 44px or taller targets. Bring the active route into view on a direct visit. Keep horizontal scrolling inside the rail.


### [Tabs inside a page](https://brand.getshared.ai/brand#nav-tabs)

Keep peer topics in a horizontally scrolling row. If a topic has related views of its own, place them in a second row under that topic, as Icons does. Use the same active rule and type in both rows. Preserve the selected topic and view in the URL.


### [Links, focus and history](https://brand.getshared.ai/brand#nav-behaviour)

Main routes

- Use links in a named navigation landmark. Apply aria-current=page to the active route, including when a destination opens at a section anchor. Keep the main navigation in place between routes.

Page tabs

- Use tablist, tab, and tabpanel for views within the current document. Use links with aria-current=page for related pages. Use Left and Right arrows to move among the local tabs, and Home and End for the first or last tab.

Deep links and Back

- Give each destination a clean URL. A direct link opens the correct route and section. Browser Back and Forward restore the previous view.

First paint

- Reveal each view after its styles and fonts are ready. Reserve the brand animation for an eligible full-page load. Navigation within the studio keeps the header in place.

## Writing

[Open the working examples](https://brand.getshared.ai/copy)

Shared is an AI workspace for people who have something to make. Write for the person at the table with a sketch, a question or five minutes before the doors open. They should be able to tell who is speaking, what’s taking shape and where their judgment counts.

In the product


### [Voice](https://brand.getshared.ai/copy#voice-title)

Use these habits across campaigns, product screens and conversations.


#### [Give the idea a shape](https://brand.getshared.ai/copy#voice)

Name the thing someone can open, change or point to. A concrete noun often does the work of three adjectives.


#### [Put the work in view](https://brand.getshared.ai/copy#voice)

Report a change someone could check. A useful update gives them a reason to look at the draft again.


#### [Leave room to choose](https://brand.getshared.ai/copy#voice)

Explain what a choice changes. Ask the smallest question that lets the person steer the work.


#### [Be exact about doubt](https://brand.getshared.ai/copy#voice)

Point to the missing fact and the decision it holds up. Give the reader a practical way to settle it.


#### [Make an easy entrance](https://brand.getshared.ai/copy#voice)

Use the words someone brought to the conversation. An ordinary description of the job is enough to begin.


### [Personality](https://brand.getshared.ai/copy#personality-title)

Keep the character recognizable when the subject, urgency or speaker changes.


#### [Curious at the start](https://brand.getshared.ai/copy#personality)

Listen for the detail that changes the design. One well-chosen question feels like someone paid attention to the brief.


#### [Resourceful with a rough brief](https://brand.getshared.ai/copy#personality)

Offer a small, reversible first pass. Say which assumption someone can change.


#### [Candid in a critique](https://brand.getshared.ai/copy#personality)

Make an observation someone else can inspect. Tie the suggestion to the job the piece has to do.


#### [Generous in a handoff](https://brand.getshared.ai/copy#personality)

Credit the person who made the choice and give the next contributor a clear starting point.


#### [Light when there’s room](https://brand.getshared.ai/copy#personality)

Let a detail in the work carry the wit. Use a plain, steady voice when someone is waiting, recovering work or weighing a consequence.


### [Who’s speaking](https://brand.getshared.ai/copy#speakers-title)

Choose the right speaker before writing a message.

Shared

- Use Shared for the company and the product. Use “we” in a signed company note when the team owns the decision. Introduce a named character as an AI agent when readers first meet them. Label staged campaign scenes as illustrations.

A named AI agent

- Identify the speaker beside their reply. An agent can say “I” for its suggestion, question or completed action. Attribute other people’s choices by name and distinguish a proposed handoff from one that reached its recipient.

The interface

- Use a neutral label for a recorded event or state, such as “Draft saved”. A button names the action the person takes. Keep agent dialogue in an attributed message so a suggestion can’t be mistaken for system confirmation.


### [Tone by situation](https://brand.getshared.ai/copy#tone-title)

Select a situation to see how the same voice adapts to the work and the reader’s needs.


#### [First brief](https://brand.getshared.ai/copy#cg-tone-first-brief)

Someone wants an app for a seed swap and has never written a brief.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-first-brief)

A familiar situation gives them a place to start.


#### [First draft](https://brand.getshared.ai/copy#cg-tone-first-look)

A drawing of two seed packets is ready to inspect.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-first-look)

The person gets something to inspect and a reason to compare.


#### [Long wait](https://brand.getshared.ai/copy#cg-tone-measured-wait)

The export reports a fixed total and confirms each completed sheet.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-measured-wait)

A count lets the person follow the work without guessing at a finish time.


#### [Conflicting details](https://brand.getshared.ai/copy#cg-tone-uncertain-source)

The hand sketch and the venue notes give different door widths.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-uncertain-source)

Showing both readings lets the person resolve the exact discrepancy.


#### [Something failed](https://brand.getshared.ai/copy#cg-tone-recoverable-failure)

Image export failed. The drawing still opens and a retry is available.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-recoverable-failure)

Name the failed step and the verified condition of the original.


#### [Permanent deletion](https://brand.getshared.ai/copy#cg-tone-irreversible-choice)

A person selected a saved drawing. Deleting it permanently requires confirmation.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-irreversible-choice)

Repeat the object and consequence at the decision. Give “Keep drawing” as the way out.


#### [Handoff received](https://brand.getshared.ai/copy#cg-tone-approved-handoff)

Juan has received the selected layout and the note about what needs review.


#### [Why this tone fits](https://brand.getshared.ai/copy#cg-tone-approved-handoff)

A receipt and a specific next task tell the person where the work went.


### [Writing by surface](https://brand.getshared.ai/copy#surfaces-title)

Use the placement and the reader’s immediate task to decide what to include.


#### [Landing pages](https://brand.getshared.ai/copy#surfaces)

Lead with something a visitor might come to make. Give a first-time reader the product category in the supporting line.


#### [Room introductions](https://brand.getshared.ai/copy#surfaces)

State the purpose and point to the first useful contribution. Keep orientation short enough to read while joining.


#### [Prompt starters](https://brand.getshared.ai/copy#surfaces)

Write a request someone could say out loud. Include one constraint that will visibly shape the result.


#### [Agent replies](https://brand.getshared.ai/copy#surfaces)

Put the answer or artifact first. If feedback is needed, ask about one decision tied to the person’s brief.


#### [Generated forms](https://brand.getshared.ai/copy#surfaces)

Use a persistent label, then a short hint when it prevents a mistake. Request only the detail the task needs.


#### [Controls and links](https://brand.getshared.ai/copy#surfaces)

Use a verb and object for an action. Name a link’s destination so it makes sense in a list of links.


#### [Empty and filtered views](https://brand.getshared.ai/copy#surfaces)

Distinguish an empty collection from a search with no matches. Offer the action that belongs to that state.


#### [Help articles](https://brand.getshared.ai/copy#surfaces)

Title the article with the reader’s task. Put the step where the person can act on it and use the label they will see.


#### [Release notes](https://brand.getshared.ai/copy#surfaces)

Describe the shipped change in terms of the task it affects. Scope the claim to the surfaces and people covered by the release.


#### [Editorial stories](https://brand.getshared.ai/copy#surfaces)

Build the opening around one observed decision. Check names, quotes and outcomes with the source. Identify a fictional study in the opening.


#### [Captions and credits](https://brand.getshared.ai/copy#surfaces)

Describe what the image contributes to the story. Place the AI illustration credit where someone seeing the image can find it.


### [Shared vocabulary](https://brand.getshared.ai/copy#words-title)

Use these words consistently across the site and product.

- Term ∣ Where it fits ∣ Example

- Shared ∣ Capitalize the product and company name. Use “shared” in lowercase for something people use together. ∣ We drew the new sign in Shared.

- AI agent ∣ Introduce an unfamiliar agent by name and role. Once the role is clear, use the name or “agent”. ∣ Lola, an AI agent in Shared, drew the first layout.

- workspace ∣ Use lowercase for the broader place where a person works with agents. Name a specific Room when its location matters. ∣ Open your workspace to start a new brief.

- Room ∣ Capitalize the Shared product space and its plural, Rooms. Use lowercase for a physical room. ∣ Add the measurements to the Market stall Room.

- brief ∣ Use for the person’s description of the job. Allow a sentence, sketch or short list to serve as a brief. ∣ The brief asks for a sign people can read from the aisle.

- draft ∣ Use for work someone can still shape. Say what the draft contains when you introduce it. ∣ The first draft has a map and a place to enter a stall number.

- preview ∣ Use when someone can inspect the result. Report availability to other people separately, when confirmed. ∣ Open the preview to check the booking page on your phone.

- handoff ∣ Use one word for the noun and two for the verb. Include the recipient and the item whenever space allows. ∣ Hand off the poster draft to Juan.

- publish ∣ Reserve this verb for making work available to its intended audience. Name the audience or destination before the person acts. ∣ Publish the programme on the festival website?

- ready ∣ Pair it with a specific next use whenever a later step is still pending. ∣ The seat map is ready for review.


### [Writing conventions](https://brand.getshared.ai/copy#conventions-title)

Keep language readable, consistent and easy to localize.


#### [Case and names](https://brand.getshared.ai/copy#conventions)

Use sentence case for headings, labels and buttons. Preserve people’s chosen names, spelling and accents. Keep Room names exactly as their owners wrote them.


#### [Punctuation and rhythm](https://brand.getshared.ai/copy#conventions)

Use a full stop for a complete message. Leave it off short controls and headings. Contractions work in conversation. Read each sentence aloud and break it where you need a second breath.


#### [Numbers and time](https://brand.getshared.ai/copy#conventions)

Use numerals for measurements, counts and elapsed time. Pair values with units. Spell out the month in prose and include the time zone when a deadline crosses locations.


#### [Links and accessible names](https://brand.getshared.ai/copy#conventions)

Start a link label with its destination or task. Give each icon button an accessible name that identifies its object. Keep the words on a visible label in its accessible name for voice control.


#### [Status people can hear](https://brand.getshared.ai/copy#conventions)

Write a short announcement for meaningful changes such as “Preview ready”. Keep the same information visible on screen. Announce stage changes once and keep ticking seconds out of live announcements.


#### [Instructions beyond colour](https://brand.getshared.ai/copy#conventions)

Refer to a label, shape or named item a person can locate without colour, position or motion. For two poster designs, “Choose the version with the large date” gives the reader a second way to identify it.


#### [Alt text in context](https://brand.getshared.ai/copy#conventions)

Describe the information someone needs for the surrounding task. For a diagram, give the relationship or sequence. Keep decorative images silent. Put credits in the visible caption.


#### [Copy that can travel](https://brand.getshared.ai/copy#conventions)

Keep whole sentences together for translation. Allow room for longer labels, names and plural forms. If a longer label wraps on a phone, preserve the object and consequence of the action.


### [Copy patterns](https://brand.getshared.ai/copy#patterns-title)

Start from a pattern that matches the state. Check the details against the real behavior before publishing.


#### [Open a new Room](https://brand.getshared.ai/copy#patterns)

A Room has been created and has no brief yet.


#### [Start an app brief](https://brand.getshared.ai/copy#patterns)

Offer this as an editable example in the person’s own voice.


#### [Start a drawing brief](https://brand.getshared.ai/copy#patterns)

A person wants to make a visual and could use a concrete starting point.


#### [State a working assumption](https://brand.getshared.ai/copy#patterns)

The agent can make a reversible choice and the brief gives a reasonable basis for it.


#### [Ask for a source](https://brand.getshared.ai/copy#patterns)

A drawing depends on a measurement the agent hasn’t received.


#### [Show a revision](https://brand.getshared.ai/copy#patterns)

The requested edit is complete and visible in the draft.


#### [Frame a choice](https://brand.getshared.ai/copy#patterns)

Both drafts exist and differ in a way the person can judge.


#### [Wait without an estimate](https://brand.getshared.ai/copy#patterns)

The current stage and elapsed time are known. The completion time is unknown.


#### [Handle a missing update](https://brand.getshared.ai/copy#patterns)

The last successful update has a timestamp and the current state can’t be confirmed. A status check is available.


#### [Correct a field](https://brand.getshared.ai/copy#patterns)

A form requires a whole number greater than zero for the guest count.


#### [Deliver a partial result](https://brand.getshared.ai/copy#patterns)

Two drawings are available and the missing third view needs a source photo.


#### [Recover a missing file](https://brand.getshared.ai/copy#patterns)

The selected file is unavailable and the person can choose a local replacement.


#### [Propose a handoff](https://brand.getshared.ai/copy#patterns)

Another agent could take the next step and the person decides whether to proceed.


#### [Record a human decision](https://brand.getshared.ai/copy#patterns)

The named person explicitly chose a version and set the next task.


#### [Confirm a public action](https://brand.getshared.ai/copy#patterns)

Publishing will make this page available to anyone with its address. Both controls are available.


#### [Confirm a replacement](https://brand.getshared.ai/copy#patterns)

The chosen action will permanently overwrite the named file. Offer a clear way to keep it.


#### [Give a completion receipt](https://brand.getshared.ai/copy#patterns)

The named file has been created, verified and made available to download.


#### [Credit an illustrated scene](https://brand.getshared.ai/copy#patterns)

The image is a commissioned AI-generated scene with Shared characters.


### [Review before publishing](https://brand.getshared.ai/copy#review-title)

Read the copy in its real layout and test the actions it describes.

- Who is speaking? Mark the company, the named AI agent or the interface. Attribute a person’s words or decision to them only when the source supports it.

- What can the reader point to? Circle the specific object, change or question. Replace broad claims with something visible in the work.

- Does the timing match the evidence? Check each use of saved, sent, received, published and ready against the event that makes it true. Check measured counts against their source.

- Can someone act on this? Try the instruction through the same screen and account state as the reader. Check that the control exists, the words match and the action leads where the copy says.

- Does the decision still belong to the person? Identify the reach and reversibility of a consequential action. Read the confirmation and both button labels together before signing off.

- What happens when the work stalls? Read the wait, missing-update, partial-result and failure states in sequence. Offer only recovery paths the product can perform safely.

- Will it work without the visual cues? Read the text in screen-reader order. Check names, links and status announcements, then check the longest label at phone width.

- Could this example be mistaken for a real claim? Verify shipped capabilities and editorial claims. Label illustrative scenes, obtain approval for customer quotations and identify AI agents wherever readers could mistake them for real staff.

## Loaders

[Open the working examples](https://brand.getshared.ai/brand/loaders)

Show what’s happening while people wait, and help them follow what changes when they act.


### [Long waits.](https://brand.getshared.ai/brand/loaders#long-waits)

Choose a scene for work that takes twenty seconds or more. The art changes as the work advances, with named stages and timing alongside it.


#### [Website builds](https://brand.getshared.ai/brand/loaders#website-loaders-title)

From page assembly and responsive checks to release and indexing.


#### [Build a website](https://brand.getshared.ai/brand/loaders#lw-build-website-title)

A browser takes shape as headings, sections and artwork are fed onto a paper grid.

- Lay out page

- Place sections

- Apply styles

- Package build


#### [Fit the breakpoints](https://brand.getshared.ai/brand/loaders#lw-fit-breakpoints-title)

A fitting station checks the same layout through desktop, tablet and phone frames.

- Set desktop

- Fit tablet

- Fit phone

- Check widths


#### [Assemble the controls](https://brand.getshared.ai/brand/loaders#lw-assemble-components-title)

Buttons, fields and status tiles lock into a blueprint for a working interface.

- Gather parts

- Place controls

- Set states

- Test assembly


#### [Route a release](https://brand.getshared.ai/brand/loaders#lw-route-release-title)

A route lights up across an atlas as a website package reaches each checkpoint.

- Prepare bundle

- Open route

- Verify nodes

- Confirm release


#### [Index a website](https://brand.getshared.ai/brand/loaders#lw-index-website-title)

A scanning carriage sorts page cards into lanes and assembles a search index.

- Read pages

- Sort entries

- Build index

- Check lookup


#### [Drawing & making](https://brand.getshared.ai/brand/loaders#drawing-loaders-title)

Five ways to turn a blank sheet or loose material into a finished piece.


#### [The drafting board](https://brand.getshared.ai/brand/loaders#lw-pencil-draft-title)

A carpenter’s pencil draws a chair in perspective, from its seat frame to the final dimension line.

- Set the sheet

- Draft the frame

- Hatch the seat

- Mark dimensions


#### [The screen print](https://brand.getshared.ai/brand/loaders#lw-screen-print-title)

A squeegee carries ink across a mesh screen. Lift the frame to reveal a two-color landscape.

- Register stock

- Pull the ink

- Finish the pass

- Lift the mesh


#### [The felt mosaic](https://brand.getshared.ai/brand/loaders#lw-felt-mosaic-title)

Tweezers place cut felt squares onto linen. A stitched finish gives the little bird its feathers.

- Lay out linen

- Place feathers

- Build the wing

- Stitch the edges


#### [The folding table](https://brand.getshared.ai/brand/loaders#lw-folded-map-title)

A route crosses three panels of a field map. Watch the creases rise and the trail markers land.

- Open the map

- Trace the route

- Score the folds

- Mark the stops


#### [The proof press](https://brand.getshared.ai/brand/loaders#lw-proof-press-title)

The flywheel drives a platen onto a sheet of stock. Follow the fresh impression to the delivery tray.

- Feed the stock

- Lower the platen

- Make the impression

- Deliver the proof


#### [Original studies](https://brand.getshared.ai/brand/loaders#original-loaders-title)


#### [The paper plotter](https://brand.getshared.ai/brand/loaders#lw-plotter-title)

An illustrated field print takes shape under a traveling pen, one measured pass at a time.

- Load stock

- Draw contours

- Lay down ink

- Stamp print


#### [The listening room](https://brand.getshared.ai/brand/loaders#lw-tape-title)

Follow a signal through a two-reel recorder as a blank tape becomes a finished recording.

- Thread tape

- Find signal

- Record take

- Splice reel


#### [When to open a scene](https://brand.getshared.ai/brand/loaders#long-waits)

Use a full scene for a substantial foreground task, such as rendering an edition or preparing an audio export. Keep a short save inside its button. If people can continue working, keep the job available in the background.


#### [What to measure](https://brand.getshared.ai/brand/loaders#long-waits)

When the total is known, report completed units against that total. For an unknown duration, name the stage and show elapsed time. Drive stage changes from actual job events in production.


### [Loading patterns.](https://brand.getshared.ai/brand/loaders#loaders)

Run each local example to see its full sequence. Pause freezes the example and replay returns it to the beginning.


#### [Inline activity](https://brand.getshared.ai/brand/loaders#loaders)

Refresh a small value while the surrounding row stays readable.


#### [Pending action](https://brand.getshared.ai/brand/loaders#loaders)

Keep the action width steady while a save is in flight.


#### [Content skeleton](https://brand.getshared.ai/brand/loaders#loaders)

Reserve the size of the incoming card to keep the layout steady.


#### [Measured transfer](https://brand.getshared.ai/brand/loaders#loaders)

Show a percentage when the total amount of work is known.


#### [Unknown duration](https://brand.getshared.ai/brand/loaders#loaders)

Use a traveling segment while the service establishes a connection.


#### [Media buffering](https://brand.getshared.ai/brand/loaders#loaders)

Keep playback controls in place while the next segment buffers.

- Read

- Render

- Pack


#### [Multi-stage job](https://brand.getshared.ai/brand/loaders#loaders)

Name the current stage of a longer operation.


#### [Queue and retry](https://brand.getshared.ai/brand/loaders#loaders)

Show the wait, explain the interruption and offer a retry.


#### [Page navigation](https://brand.getshared.ai/brand/loaders#loaders)

Keep the current page visible while the destination loads.


### [Interface transitions.](https://brand.getshared.ai/brand/loaders#transitions)

Watch how a detail, a confirmation and a view change enter the interface.


#### [Disclosure](https://brand.getshared.ai/brand/loaders#transitions)

Reveal supporting details beneath a persistent heading.


#### [Confirmation](https://brand.getshared.ai/brand/loaders#transitions)

Bring a short confirmation into view after a local action.


#### [View change](https://brand.getshared.ai/brand/loaders#transitions)

Crossfade between two views within one stable frame.


### [Timing & accessibility.](https://brand.getshared.ai/brand/loaders#timing)


#### [Timing tokens](https://brand.getshared.ai/brand/loaders#timing)

--motion-fast · 120ms

- Crossfade a label or color change.

--motion-enter · 220ms

- Reveal a panel or confirmation using cubic-bezier(.2,.8,.2,1).

--motion-loop · 1200ms

- Repeat a waiting signal with linear timing. Use steps for discrete pixel frames.


#### [Accessible feedback](https://brand.getshared.ai/brand/loaders#timing)

With prefers-reduced-motion: reduce, decorative loops stop and transitions settle immediately. Labels and measured progress still update.

Announce meaningful stage changes with a polite status region. Expose measured progress with a named progress element and keep frequent percentage updates out of live regions.

Keep keyboard focus on the triggering control and provide a recovery action after a failure.

## Generative UI

[Open the working examples](https://brand.getshared.ai/components/generative)

Build task-specific views from Shared components in Nando Rooms and live calls. Try a prompt, browse the working examples, or inspect the view contract.


### [Say it to Nando.](https://brand.getshared.ai/components/generative#prototype)

Type a line the way you would say it in a room or on a call. The page finds the use case and builds its view from brand guide components. Everything runs locally on this page.


### [Use cases.](https://brand.getshared.ai/components/generative#gl-title)

Every moment of a Nando Room or a Nando Live call where a view helps. Each use case gives the line someone says, the view Nando shows, the brand guide components it is built from and the rule it follows.


### [From a line to a view.](https://brand.getshared.ai/components/generative#flow)

Nando can propose a view. The application decides what the view contains and which actions a person can take.

- Hear the requestIdentify the task, the thing it concerns and who is asking: the host, a guest or the caller. Ask once when the line could mean two things.

- Check the viewCheck the version, the use case and every component against the registry. A view that fails is not shown, and Nando answers in words.

- Build from the brand guideBuild each component with the application’s own data and the brand guide’s markup. Labels, keyboard behaviour and states stay as specified.

- Confirm and reportSending, spending, removing and publishing show their effect first. On confirmation the application checks permission again, acts and shows the result.


### [Component registry.](https://brand.getshared.ai/components/generative#contract)

A view may use only the components below. Each one is a brand guide component and accepts data, never markup. The application supplies the data and owns every action.

version

- 2. A view with another version is refused.

useCase

- The address of a use case in the library above.

surface, place

- Nando Rooms, Nando Live or both, and where the view appears. Both must match the use case.

components

- One to three components from the registry, each with exactly the data its row lists.

- Component ∣ Brand guide source ∣ Data the application supplies ∣ Used in


### [Code review and design QA.](https://brand.getshared.ai/components/generative#qa-heading)

The review covers Shared Studio’s nine pages, eight brand tabs and the browser behavior of the use-case library.

- The catalog is built. A build step refuses a use case without a unique address, a moment, a surface, a line or an event, a rule, or a view of one to three registered components. The same step writes the view schema from the registry this page runs.

- Every view was rendered. All the use cases were built in Chromium from their specifications under this page’s content security policy, with no script errors. Each specification was also validated against the schema. A specification with another version, an unknown component or an extra field is refused.

- Components come from the brand guide. Views use the brand guide’s classes and style sheets for buttons, fields, chips, notices, tables, dialogs and the Room toolbar. This page adds layout.

- Widths and focus. The page was checked at 320, 390, 768 and 1440 pixels with no sideways scrolling. Confirmations open with focus on Cancel, close on Escape and return focus to the control that opened them.

- Stale generated views. Unsupported requests used to leave the previous preview and its controls on screen. The composer now clears the old view and JSON, and offers a supported next action.

- Confirmation focus. Opening a confirmation used to focus the confirming button. The preview now focuses Cancel first. Sending, spending, publishing and removal examples describe their effects before confirmation.

- SVG rendering. The icon browser used serialized markup for previews and downloads. Both now use one SVG builder with a fixed set of elements and attributes.

- Clipboard feedback. Copying a photography prompt could update the message on a different image if the viewer moved on. The receipt now belongs to the image that initiated the copy.

- Navigation and spacing. One shared header component supplies navigation on every page. The mobile menu supports Escape and returns focus to its trigger. Component layouts share the existing section spacing and use larger actions, clear labels and inset caret artwork.

- Status regions. Status regions stay available to assistive technology before the first update.

- Walked the nine pages and all eight brand tabs in Chrome at 320, 390, 768 and 1440 pixels. Checked desktop and phone screenshots, page landmarks, image text alternatives, script syntax and local anchors.

- Exercised keyboard navigation, the Room toolbar, form errors and recovery, modal cancellation, type controls, both icon finishes and SVG download, prompt copying, component progress and confirmation.

The examples use made-up people, rooms, dates and amounts. Nothing on this page sends, books, spends, records or removes anything. Each control answers with a local receipt, and the consent it shows is still needed when the view is connected to a real application action.

The composer matches a typed line to a use case by its words. It does not listen, and it is not the model Nando uses on a call.

The hfs2s application checks also ran. The repository test stopped in the Juan Rooms interaction suite. The host TypeScript check reported two errors in Rooms test files. Studio pages were checked independently from those application tests.

## Icons

[Open the working examples](https://brand.getshared.ai/brand/icons)

Browse 200 Shared base symbols and 9,800 object–action icons. Compare paper and flat finishes at the size you’ll use.


### [Reviewer Inbox reactions](https://brand.getshared.ai/brand/icons#emoji-title)

The five reactions already used in Reviewer Inbox, drawn in Shared’s paper pixel style.


### [The icon collection](https://brand.getshared.ai/brand/icons#catalog-title)

200 base symbols and 9,800 object–action icons. Use an action filter for a task such as Download · File.

Browse the Sketch mode icon library


#### [Results](https://brand.getshared.ai/brand/icons#results-title)

Try a shorter search or clear the filters.


### [Rooms](https://brand.getshared.ai/brand/icons#core-icons)


#### [Reply](https://brand.getshared.ai/brand/icons#core-icons)

Discussion and shared replies


#### [Room](https://brand.getshared.ai/brand/icons#core-icons)

A shared place to meet


#### [People](https://brand.getshared.ai/brand/icons#core-icons)

Members of a team


#### [Seat](https://brand.getshared.ai/brand/icons#core-icons)

An agent’s working session


### [Platform](https://brand.getshared.ai/brand/icons#core-icons)


#### [Node](https://brand.getshared.ai/brand/icons#core-icons)

An agent’s environment


#### [Share](https://brand.getshared.ai/brand/icons#core-icons)

Pass a file or result to a group


#### [Key](https://brand.getshared.ai/brand/icons#core-icons)

Permissions and access


#### [Lock](https://brand.getshared.ai/brand/icons#core-icons)

Contents with an access rule


### [Workspace](https://brand.getshared.ai/brand/icons#core-icons)


#### [File](https://brand.getshared.ai/brand/icons#core-icons)

An individual document


#### [Stack](https://brand.getshared.ai/brand/icons#core-icons)

A collection of documents or memory


#### [Folder](https://brand.getshared.ai/brand/icons#core-icons)

Work grouped together


#### [Grid](https://brand.getshared.ai/brand/icons#core-icons)

Assets displayed as a collection


#### [Check](https://brand.getshared.ai/brand/icons#core-icons)

Completed work


#### [Path](https://brand.getshared.ai/brand/icons#core-icons)

A route through several steps


#### [Calendar](https://brand.getshared.ai/brand/icons#core-icons)

A scheduled event


#### [Bell](https://brand.getshared.ai/brand/icons#core-icons)

An update that needs attention


### [Media](https://brand.getshared.ai/brand/icons#core-icons)


#### [Wave](https://brand.getshared.ai/brand/icons#core-icons)

Audio and the studio waveform


#### [Microphone](https://brand.getshared.ai/brand/icons#core-icons)

Recording and conversation


#### [Play](https://brand.getshared.ai/brand/icons#core-icons)

Start media playback


#### [Tape](https://brand.getshared.ai/brand/icons#core-icons)

A recorded session or episode


### [Studio](https://brand.getshared.ai/brand/icons#core-icons)


#### [Bird](https://brand.getshared.ai/brand/icons#core-icons)

The paper bird from the plotter


#### [Leaf](https://brand.getshared.ai/brand/icons#core-icons)

The paper listening dish motif


#### [Spark](https://brand.getshared.ai/brand/icons#core-icons)

A small accent on campaign artwork


#### [Pin](https://brand.getshared.ai/brand/icons#core-icons)

A place on a map or plan


### [Use the shared texture](https://brand.getshared.ai/brand/icons#main)

Load the sprite once. Each SVG symbol clips the same paper tile to its silhouette. Use the flat master at small sizes or when you need a single, clean colour treatment.

## Sketch icons

[Open the working examples](https://brand.getshared.ai/brand/icons/sketch)

Browse 10,000 rounded-stroke icons. Copy a built-in glyph or custom art path into a Sketch mode node.


### [All icons](https://brand.getshared.ai/brand/icons/sketch#sketch-group-title)

Loading icons…

Tabler Icons and Hugeicons license notices

## Photography

[Open the working examples](https://brand.getshared.ai/artifacts/photography)

Read the art direction and browse 100 Shared campaign studies across ten industries. Open each study for its cast, prompt, and download.

No matches. Try another word or clear the filters.


### [Software & creative](https://brand.getshared.ai/artifacts/photography#software-creative-title)

Study 001


#### [The component table](https://brand.getshared.ai/artifacts/photography#software-creative)

Four web designers assemble the pieces of a homepage on a low workshop table.

Jae, Elijah, Kai, Soraya

Study 002


#### [The paper plotter](https://brand.getshared.ai/artifacts/photography#software-creative)

Four illustrators lift a paper strip from a plotter while studying the first printed graphic.

Aissatou, Andrej, Sakina, Soren

Study 003


#### [The startup demo](https://brand.getshared.ai/artifacts/photography#software-creative)

Four collaborators test a physical app prototype on a bright stage.

Zoya, Arlo, Dev, Luca

Study 004


#### [The type drawer](https://brand.getshared.ai/artifacts/photography#software-creative)

Four type designers compare paper letterforms beside wide shallow drawers.

Ishaan, Ximena, Dawa, Aram

Study 005


#### [The responsive wall](https://brand.getshared.ai/artifacts/photography#software-creative)

Four web builders align different-size layout sketches on a felt wall.

Sade, Arjun, Ploy, Noah

Study 006


#### [The icon kiln](https://brand.getshared.ai/artifacts/photography#software-creative)

Four design-system makers compare a set of raised pixel icons.

Min, Bahram, Amara, Noelia

Study 007


#### [The field recorder](https://brand.getshared.ai/artifacts/photography#software-creative)

Four sound designers arrange a physical map of a recorded conversation.

Layla, Saanvi, Mazin, Nahla

Study 008


#### [The unfolding storyboard](https://brand.getshared.ai/artifacts/photography#software-creative)

Four story artists spread a continuous accordion prototype across a print table.

Bao, Citlali, Ozan, Dimitri

Study 009


#### [The motion tabletop](https://brand.getshared.ai/artifacts/photography#software-creative)

Four animators plan a stop-motion sequence using stepped felt mosaics.

Tyler, Iris, Seoyeon, Keanu

Study 010


#### [The accessibility rehearsal](https://brand.getshared.ai/artifacts/photography#software-creative)

Four product designers test a high-contrast navigation prototype.

Chidi, Maya, Anouk, Jae


### [Architecture & construction](https://brand.getshared.ai/artifacts/photography#architecture-construction-title)

Study 011


#### [Library at the corner](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four designers test a stepped white-card library model by sliding a cobalt felt pedestrian route under the entrance canopy.

Elijah, Kai, Soraya, Aissatou

Study 012


#### [The daylight study](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four designers use a small scale room and a paper screen to compare the shadows cast by different window openings.

Andrej, Sakina, Soren, Zoya

Study 013


#### [A fit check](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four workshop teammates compare a small paper joint with a full-scale timber corner prototype.

Arlo, Dev, Luca, Ishaan

Study 014


#### [Courtyard access](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four planners move square markers along a tabletop model to check a route through a courtyard.

Ximena, Dawa, Aram, Sade

Study 015


#### [Wayfinding walk-through](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four teammates try two sign heights against a full-size doorway mockup.

Arjun, Ploy, Noah, Min

Study 016


#### [The facade choice](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four teammates compare perforated paper screen samples against real light from a tall window.

Bahram, Amara, Noelia, Layla

Study 017


#### [Rain garden model](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four landscape designers arrange paper planting blocks and a blue felt drainage path around a building model.

Saanvi, Mazin, Nahla, Bao

Study 018


#### [Tiles on the wall](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four colleagues make a full-size wall pattern from alternating ceramic and felt squares.

Citlali, Ozan, Dimitri, Tyler

Study 019


#### [The site handoff](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four site teammates compare a folded site plan with a cardboard building model in a temporary office.

Iris, Seoyeon, Keanu, Chidi

Study 020


#### [A pavilion takes shape](https://brand.getshared.ai/artifacts/photography#architecture-construction)

Four makers test a modular paper roof against the frame of a small timber pavilion model.

Maya, Anouk, Jae, Elijah


### [Education & libraries](https://brand.getshared.ai/artifacts/photography#education-libraries-title)

Study 021


#### [The light table](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four collaborators lean over a library light table, testing how differently colored paper squares project through a simple lens.

Kai, Soraya, Aissatou, Andrej

Study 022


#### [The returned-books route](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four library staff compare book-return routes on a tabletop model with felt lanes and plain paper book blocks.

Sakina, Soren, Zoya, Arlo

Study 023


#### [The repaired page](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four archivists compare a page repair sample at a long conservation bench.

Dev, Luca, Ishaan, Ximena

Study 024


#### [The campus route rehearsal](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four educators walk through an accessible campus route on a large tactile model.

Dawa, Aram, Sade, Arjun

Study 025


#### [The traveling reading kit](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four librarians assemble a portable reading kit from folded paper pockets and square felt dividers.

Ploy, Noah, Min, Bahram

Study 026


#### [The paper planetarium](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four teachers test folded paper orbit models at a science education center.

Amara, Noelia, Layla, Saanvi

Study 027


#### [The museum listening station](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four museum educators arrange tactile shapes for an interactive listening station.

Mazin, Nahla, Bao, Citlali

Study 028


#### [The adult classroom](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four adult educators test a hands-on fraction activity with large square paper pieces.

Ozan, Dimitri, Tyler, Iris

Study 029


#### [The reading room test](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four literacy educators review how paper booklets sit in an adjustable tabletop display.

Seoyeon, Keanu, Chidi, Maya

Study 030


#### [The exhibition rehearsal](https://brand.getshared.ai/artifacts/photography#education-libraries)

Four student mentors rehearse a small paper exhibition before visitors arrive.

Anouk, Jae, Elijah, Kai


### [Healthcare & accessibility](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility-title)

Study 031


#### [The quiet waiting route](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates reposition a short strip of felt and a paper sign on a scale model of a clinic waiting room.

Soraya, Aissatou, Andrej, Sakina

Study 032


#### [The handoff board](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates arrange colored square cards on a mock handoff board in an empty consultation room.

Soren, Zoya, Arlo, Dev

Study 033


#### [The tap-target workshop](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates try differently sized square buttons on a tabletop accessibility prototype.

Luca, Ishaan, Ximena, Dawa

Study 034


#### [The accessible intake](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates test the order of reusable intake cards at a daylight-filled reception desk.

Aram, Sade, Arjun, Ploy

Study 035


#### [The signage contrast check](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates compare two square-tile wayfinding symbols on a board in a sunlit hallway.

Noah, Min, Bahram, Amara

Study 036


#### [The exam-room walkthrough](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates test the clear space around a height-adjustable surface using a blank floor plan and felt squares.

Noelia, Layla, Saanvi, Mazin

Study 037


#### [The easy-grip timer](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates compare tactile knobs and square markers for a physical reminder timer.

Nahla, Bao, Citlali, Ozan

Study 038


#### [The low-sensory corner](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates position a felt-tile wall and pieces of a scale model for a quiet seating area.

Dimitri, Tyler, Iris, Seoyeon

Study 039


#### [The home-visit kit](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates arrange demonstration cards and felt pouches in an open mock home-visit kit.

Keanu, Chidi, Maya, Anouk

Study 040


#### [The rehabilitation practice rail](https://brand.getshared.ai/artifacts/photography#healthcare-accessibility)

Four teammates align felt markers on a worktable in a rehab studio with practice rails in the background.

Jae, Elijah, Kai, Soraya


### [Food & hospitality](https://brand.getshared.ai/artifacts/photography#food-hospitality-title)

Study 041


#### [Opening the bakery](https://brand.getshared.ai/artifacts/photography#food-hospitality)

In a sunlit bakery, Aissatou slides a sheet pan of scored dough into the center of a cooling rack while Andrej steadies the tray, Sakina checks a second pan, and Soren stages a paper-lined basket.

Aissatou, Andrej, Sakina, Soren

Study 042


#### [Making the lunch pass](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Zoya sets a finished plate on a kitchen pass as Arlo reaches for it, Dev adds a garnish to another plate, and Luca moves a stack of clean plates into reach.

Zoya, Arlo, Dev, Luca

Study 043


#### [Setting the welcome table](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Ishaan places blank key sleeves on a hotel welcome table while Ximena lines up reusable room keys, Dawa unfolds a paper site map, and Aram opens a shallow tray.

Ishaan, Ximena, Dawa, Aram

Study 044


#### [Proving a takeaway package](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Sade assembles a folded lunch box while Arjun nests a paper insert, Ploy compares two blank sample sleeves, and Noah holds a takeaway cup against the tray opening.

Sade, Arjun, Ploy, Noah

Study 045


#### [Rehearsing the café handoff](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Min carries a cup to a collection shelf while Bahram adjusts the tray position, Amara sets a kettle beside the till, and Noelia watches from the customer side of the counter.

Min, Bahram, Amara, Noelia

Study 046


#### [Laying the terrace](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Layla places a ceramic water jug on a terrace table while Saanvi aligns a napkin, Mazin straightens a chair, and Nahla hands over a plate.

Layla, Saanvi, Mazin, Nahla

Study 047


#### [Building the market stand](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Bao tilts a wooden crate of pears toward the market aisle as Citlali tucks paper around the fruit, Ozan positions a second crate, and Dimitri lifts the corner of a square cloth.

Bao, Citlali, Ozan, Dimitri

Study 048


#### [Preparing the tasting flight](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Tyler lines up four small cups while Iris pours a measure from a carafe, Seoyeon divides paper tasting slips, and Keanu sets down a wooden flight tray.

Tyler, Iris, Seoyeon, Keanu

Study 049


#### [Finishing a plate together](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Chidi holds a platter steady while Maya adds a final spoonful, Anouk arranges clean side plates, and Jae passes a small bowl of garnish.

Chidi, Maya, Anouk, Jae

Study 050


#### [Resetting the breakfast room](https://brand.getshared.ai/artifacts/photography#food-hospitality)

Elijah arranges folded paper napkins while Kai aligns a line of cups, Soraya places a pitcher, and Aissatou brings a clean serving tray to the breakfast sideboard.

Elijah, Kai, Soraya, Aissatou


### [Climate & agriculture](https://brand.getshared.ai/artifacts/photography#climate-agriculture-title)

Study 051


#### [Orchard frost rehearsal](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four orchard stewards study a long row of apple trees while placing colored squares on a hand-drawn frost map.

Andrej, Sakina, Soren, Zoya

Study 052


#### [Propagation bench](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four greenhouse colleagues inspect the fit of a seedling tray beside a grid of paper planting markers.

Arlo, Dev, Luca, Ishaan

Study 053


#### [Seed library counter](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

The seed library team tips dried beans into compartmented paper trays to compare varieties.

Ximena, Dawa, Aram, Sade

Study 054


#### [Watershed flow model](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four field technicians follow a ribbon of blue felt through a raised watershed model.

Arjun, Ploy, Noah, Min

Study 055


#### [Tool barn repair](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four farm colleagues line up square spare-parts labels as they compare a repaired irrigation connector.

Bahram, Amara, Noelia, Layla

Study 056


#### [Field sampling station](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four researchers compare sample cups beside a portable grid at the edge of a field.

Saanvi, Mazin, Nahla, Bao

Study 057


#### [Rooftop planting handoff](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four gardeners decide where to place a yellow tile on a map of their rooftop beds.

Citlali, Ozan, Dimitri, Tyler

Study 058


#### [Vineyard slope study](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four vineyard colleagues move paper blocks on a slope map set beside the vines.

Iris, Seoyeon, Keanu, Chidi

Study 059


#### [Pollinator garden review](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four gardeners arrange colored sample cards across a pollinator plot plan beside the beds.

Maya, Anouk, Jae, Elijah

Study 060


#### [Sunroom irrigation test](https://brand.getshared.ai/artifacts/photography#climate-agriculture)

Four technicians observe a water drop from a demonstration emitter over rows of propagation cells.

Kai, Soraya, Aissatou, Andrej


### [Manufacturing & logistics](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics-title)

Study 061


#### [The fit check](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four collaborators compare an unpowered cream housing, a felt-backed gauge and a paper clearance pattern at a component-inspection bench.

Sakina, Soren, Zoya, Arlo

Study 062


#### [The fixture trial](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four collaborators check a new wooden assembly fixture against a small cream spacer while a folded paper template rests on the bench.

Dev, Luca, Ishaan, Ximena

Study 063


#### [The training station](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four colleagues practice arranging inert foam packages on a low training cart with a square-grid layout.

Dawa, Aram, Sade, Arjun

Study 064


#### [The return sort](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four teammates compare an open return carton, blank paper sleeves and sorting trays at a raised workbench.

Ploy, Noah, Min, Bahram

Study 065


#### [The street plan](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four dispatch teammates reposition colored tiles on a paper route plan in a sunny dispatch room.

Amara, Noelia, Layla, Saanvi

Study 066


#### [The package prototype](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four colleagues test how a small cream product sits inside a plain folding carton at a packing workshop.

Mazin, Nahla, Bao, Citlali

Study 067


#### [The loading mockup](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four colleagues test slightly different arrangements of small model cartons on a tabletop loading platform.

Ozan, Dimitri, Tyler, Iris

Study 068


#### [The dispatch rail](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four rail dispatch teammates review colored parcel blocks on a long felt scheduling rail next to a window.

Seoyeon, Keanu, Chidi, Maya

Study 069


#### [The quality gate](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four reviewers compare the surfaces of two small unmarked cream parts under a diffused inspection lamp.

Anouk, Jae, Elijah, Kai

Study 070


#### [The repair handoff](https://brand.getshared.ai/artifacts/photography#manufacturing-logistics)

Four repair colleagues decide which unpowered components to keep beside a small cream casing and square felt bins.

Soraya, Aissatou, Andrej, Sakina


### [Retail & consumer goods](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods-title)

Study 071


#### [The bookshop display](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people set a book on an angled wooden support and adjust a square paper spacer inside a sunny bookshop.

Soren, Zoya, Arlo, Dev

Study 072


#### [A place for each bottle](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people place frosted bottles on a felt-lined countertop tray and compare how the caps line up.

Luca, Ishaan, Ximena, Dawa

Study 073


#### [The fabric sample pass](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people compare fabric swatches with the collar and sleeve of a jacket at a cutting table.

Aram, Sade, Arjun, Ploy

Study 074


#### [The window before opening](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people arrange folded-paper steps and a simple ceramic object in a storefront window display.

Noah, Min, Bahram, Amara

Study 075


#### [How the box opens](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people test the opening and fit of a square cardboard insert around a ceramic cup.

Noelia, Layla, Saanvi, Mazin

Study 076


#### [Shelf labels with breathing room](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people test the spacing of blank shelf cards beside rows of refill jars.

Nahla, Bao, Citlali, Ozan

Study 077


#### [The lace and the lining](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people compare laces, felt lining and a mock sole around a prototype shoe.

Dimitri, Tyler, Iris, Seoyeon

Study 078


#### [A steadier handle](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people compare a ceramic pitcher's handle with a second curved handle and a square paper gauge.

Keanu, Chidi, Maya, Anouk

Study 079


#### [Market stall setup](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people arrange display blocks, crates and paper packets under a striped market canopy.

Jae, Elijah, Kai, Soraya

Study 080


#### [A repair worth keeping](https://brand.getshared.ai/artifacts/photography#retail-consumer-goods)

Four people inspect a loose seam on a canvas tote and compare swatches for a repair patch.

Aissatou, Andrej, Sakina, Soren


### [Arts & media](https://brand.getshared.ai/artifacts/photography#arts-media-title)

Study 081


#### [Set a microphone](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents position a microphone and listen through headphones in a small recording booth.

Zoya, Arlo, Dev, Luca

Study 082


#### [Lift a print proof](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents lift a cobalt print from a screen-printing frame and compare it with a paper sample.

Ishaan, Ximena, Dawa, Aram

Study 083


#### [Pin the costume panels](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents pin felt patches onto a stage jacket laid across a costume worktable.

Sade, Arjun, Ploy, Noah

Study 084


#### [Cue a live segment](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents pass a blank cue card across a community radio mixing desk.

Min, Bahram, Amara, Noelia

Study 085


#### [Bounce light on location](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents adjust a reflector and felt prop on an outdoor filming set.

Layla, Saanvi, Mazin, Nahla

Study 086


#### [Rehearse a miniature](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents move paper scenery and check its shadows in a model theatre.

Bao, Citlali, Ozan, Dimitri

Study 087


#### [Arrange an object study](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents position a folded-paper object and adjust the lights for a photo shoot.

Tyler, Iris, Seoyeon, Keanu

Study 088


#### [Check the gallery spacing](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents measure and position felt panels on a gallery wall.

Chidi, Maya, Anouk, Jae

Study 089


#### [Sequence the edit](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents sort image cards into a sequence on a long felt board.

Elijah, Kai, Soraya, Aissatou

Study 090


#### [Test the exhibition approach](https://brand.getshared.ai/artifacts/photography#arts-media)

Four agents place a stepped exhibit panel and inspect it from the visitor path.

Andrej, Sakina, Soren, Zoya


### [Civic & community services](https://brand.getshared.ai/artifacts/photography#civic-community-services-title)

Study 091


#### [A stop you can find](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents compare a tactile boarding marker with a full-scale bus stop bench mockup.

Arlo, Dev, Luca, Ishaan

Study 092


#### [The repair café](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four volunteers trace a loose seam on a canvas tote at a library repair café.

Ximena, Dawa, Aram, Sade

Study 093


#### [A clear path through the park](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents align a blue wayfinding arrow at the fork of a park path.

Arjun, Ploy, Noah, Min

Study 094


#### [Space on the noticeboard](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents arrange colored paper squares on a neighborhood noticeboard without blocking any of the lower slots.

Bahram, Amara, Noelia, Layla

Study 095


#### [Fitting the chairs](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four organizers fit paper chair cutouts around a square floor plan for a neighborhood assembly.

Saanvi, Mazin, Nahla, Bao

Study 096


#### [Testing the mural rhythm](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents compare a tabletop color mockup with the first square tiles of a community mural.

Citlali, Ozan, Dimitri, Tyler

Study 097


#### [The neighborhood readiness table](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents group flashlights and battery packs into labeled-by-color felt trays during a community readiness workshop.

Iris, Seoyeon, Keanu, Chidi

Study 098


#### [Room to play](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents test how a lime felt path connects three play areas in a tabletop playground model.

Maya, Anouk, Jae, Elijah

Study 099


#### [A volunteer delivery route](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents move square route markers between pickup and delivery points on a tabletop map.

Kai, Soraya, Aissatou, Andrej

Study 100


#### [Laying out the public event](https://brand.getshared.ai/artifacts/photography#civic-community-services)

Four agents shift a paper canopy and a cobalt path on a scale model of a public square.

Sakina, Soren, Zoya, Arlo


### [Art direction and production](https://brand.getshared.ai/artifacts/photography#art-direction)

Make a shared decision visible. Show a group of agents doing real work in bright settings, with paper, felt and square pixels in the scene.

- Purpose

- Casting

- Visual direction

- Industries

- Framing

- Prompt recipe

- Review and delivery


#### [What a photograph should communicate](https://brand.getshared.ai/artifacts/photography#photo-brief-purpose)

The work is shared and the next step is visible. Show four commissioned Shared agents working through a concrete decision together. The viewer should be able to point to the artifact they are making, understand what changed and tell who is participating. Aim for the moment one person slides a piece into place and the others can see how it fits.

The photographs are fictional studies with Shared AI characters. In public copy, identify them as AI agents or as a Shared campaign illustration wherever the context might imply they are real staff, customers, patients or testimonials.


#### [Casting and direction](https://brand.getshared.ai/artifacts/photography#photo-brief-casting)

- Use the named portrait files from the Shared character library as identity references. Keep facial structure, hair, age cues, skin tone and visible personal details consistent. Preserve Jae’s device where that side of the head is visible and preserve other accessories when part of the approved likeness. Compare the rendered faces with the portraits before approving.

- Cast four adults. Put all four in the same physical setting, at the same scale and in the same light. Give each a credible place at the table and a distinct action, glance or response. Rotate who leads, who checks and who reacts across the set.

- Prefer candid three-quarter faces and two or three coordinated sightlines. Let a person listen or pause. Stage hands around the object with simple, believable grips and no unnecessary overlapping fingers.

- Work from wider environmental views and medium-wide group compositions. Check that hair, shoulders and arms have room at the side edges. Use a table, workbench or the bottom of the photograph to establish a natural lower edge. Use complete silhouettes for any cutout asset.

- Style people for the setting. Wardrobe can move within the colors and materials of each industry. Keep identity landmarks recognizable. Workplace PPE and props must match the task. Use fictional material, records and screens.


#### [Photographic language](https://brand.getshared.ai/artifacts/photography#photo-brief-visual-direction)

- Light. Bright window or skylight as a broad key, with warm-white bounce and soft but legible shadow. Start with neutral-warm daylight, then use a white reference to keep uncoated paper from turning orange. Hold detail in skin, white sheets and darker clothes together.

- Color. Cream and oat carry the room. Cobalt, sunny yellow and green can identify moving pieces or different input sources. Use an accent where it helps read the action. Maintain natural skin tones and let real locations vary, including outdoor sky and wood.

- Material. Use uncoated paper, card seams and folds, short-pile wool felt and matte painted housings. Fold paper for prototypes and use felt as a patch, pad or work surface. Let an edge catch light so each material reads.

- Pixels. Put square pixels in the action, such as route-map tiles, square labels, stacked elevation blocks or a stepped paper prototype. Build steps with equal square units. Use larger, readable shapes and let the shape belong to the scene. Keep faces, hair and hands optical and sharply resolved.

- Retrofuturism. Use a plausible object with one playful twist, such as an off-white prototype with a clicky control, a physical queue board or a paper simulation of an interface. Keep the work modern and credible.

- Camera. Start with a 35–50 mm full-frame equivalent near eye level. Use a slightly elevated 35 mm view when the work surface must read. Keep the group in focus. Avoid extreme edge distortion, heavy vignette, plastic skin and uniform orange grading.


#### [Coverage by industry](https://brand.getshared.ai/artifacts/photography#photo-brief-industries)

Each industry needs ten scenes that explore different actions and settings. Think in terms of decision points rather than outfits. Gather views that can support a campaign, editorial article or product example.

- Software and creative work — assemble a page, trace a user flow or compare a paper interaction.

- Architecture and construction — fit a model, inspect a materials joint or work through a site plan.

- Education and libraries — lay out an activity, sort an archive or plan a shared reading space.

- Healthcare and accessibility — make signage legible, test a physical intake prototype or plan a handoff with fictional records.

- Food and hospitality — check service flow, build a display, compare packaging or plate a shared spread.

- Climate and agriculture — review a planting layout, sort field inputs or plan irrigation on a physical model.

- Manufacturing and logistics — test a jig, inspect components, pack a prototype or trace a route.

- Retail and consumer goods — compare samples, plan a shop fixture or test a package opening.

- Arts and media — assemble a set model, check print proofs or lay out a visual sequence.

- Civic and community services — map a public space, plan an exhibition or test wayfinding with tactile elements.


#### [Frame and crop](https://brand.getshared.ai/artifacts/photography#photo-brief-framing)

- Capture a landscape master with the full group and the shared object. Keep a margin around the outside shoulders, more than you expect to need in the hero. Arrange people in depth when possible so the group can survive a narrower crop.

- Deliver the native master and verify the campaign’s 2.30:1 wide crop and 1.52:1 phone crop. Use the master as-is when a crop takes away a person or an important hand. For narrow containers, place the photograph in a frame and give copy its own line.

- For a copy-over-image brief, shoot an alternate with a quiet wall, window or table area. Keep the copy live and measure contrast over the selected crop.

- Photograph or render the whole scene as one image with intentional borders at delivery. Keep words, logos and UI overlays out of the art. Add them as live HTML in layouts where needed.


#### [Generation recipe](https://brand.getshared.ai/artifacts/photography#photo-brief-prompt-recipe)

For each shot, describe the industry, setting, one action, the object that makes the action intelligible, the group and the framing. Attach one numbered identity portrait per cast member and name them in that order. Use the Shared daylight and materials direction with the specific framing needed for the shot. Ask for a single frame. When making a variation, change one or two qualities at a time, such as viewpoint or daylight direction, and repeat the identity and framing requirements.


#### [Edit, proof and delivery](https://brand.getshared.ai/artifacts/photography#photo-brief-review-and-delivery)

- Compare the master with each portrait and check all four faces, edges, hands, repeated objects and visible text. Confirm the physical work and safety gear fit the setting.

- Proof both standard crops at actual placements, plus thumbnails and a 390 px phone width. Inspect edges for clipped shoulders and retain the whole group at small sizes. Confirm scene text stays separate from the art.

- Keep a master and an sRGB WebP for the web. Use the library’s shot ID and a short action-based filename. For the web, serve a smaller thumbnail next to the larger open-on-demand version. Preserve the native aspect ratio in the sampling gallery.

- Record the shot ID, industry, commissioned cast references, prompt, caption, and alt text describing the action. Mark the set as AI-generated sampling and review specific likenesses before handing off a hero campaign selection.


### [Frame the action](https://brand.getshared.ai/artifacts/photography#photo-crops)

Try the 2.30:1 wide crop and 1.52:1 phone crop on this campaign frame. Keep the group and its work visible. Use a framed landscape master if the narrower crop loses a person.


### [Photography gallery](https://brand.getshared.ai/artifacts/photography#photography-gallery-spec)

Use this layout for a searchable collection of photographs. Group related studies under a descriptive heading and keep captions and cast credits with their images.

Open the photography gallery


#### [Layout and type](https://brand.getshared.ai/artifacts/photography#photography-gallery-spec)

Gallery introduction

- Use the Paper grid, the shared gutter and section spacing, and a two-column image and introduction layout with the shared content gap. Stack at 760 px and below. Set the main H1 in Instrument Serif at 42–94 px before applying the display scale. Set the figure caption in muted 14 px Inter with 12 px above it.

Industry sections

- Use the Inter section heading scale (27–42 px) for industry names. Leave the shared content gap below the heading. Separate industry groups with a Line rule and the shared section spacing.

Study cards

- Use three columns, two at 850 px and below, and one at 560 px and below. Use the shared content gap across columns and 28–56 px between rows. Keep thumbnails at their original aspect ratio. Leave 14 px below the image before the 12 px JetBrains Mono study number. Use an underlined 16–20 px Inter heading, 16 px Inter for the caption and muted 14 px Inter for cast credits with 8 px above them.

Filters and status

- Use 14 px Inter labels, 8 px between label and field, and 16 px Inter in the 44 px search and select controls. Use a Stock field surface, Line borders, the pixel caret and the shared form gap. Keep the count in 13 px JetBrains Mono and use body type for the empty state. Arrange filters in four columns, then two at 850 px and below and one at 560 px and below.

Links and actions

- Set text links in JetBrains Mono with a persistent 1 px underline offset by 4 px. Use the shared blue focus outline around the whole linked study preview. Use pixel buttons for clear, close, previous, next, download and copy within their control groups, with plain JetBrains Mono labels.

Image viewer

- Use the Stock surface, Line border and 14–28 px inset. Set the title in Inter using the compact heading scale (16–20 px). Use Inter for captions and cast credits. Preserve the image aspect ratio in the viewer. Set the prompt disclosure in 14 px JetBrains Mono and prompt copy in 13 px JetBrains Mono. Support Escape, arrow keys and focus return to the opening card.


### [Campaign library](https://brand.getshared.ai/artifacts/photography#art-direction)

Production photographs, artwork and video from Shared’s paper workshop.


### [Faces in social posts](https://brand.getshared.ai/artifacts/photography#social-photo-framing)

Keep every face fully inside the image area and clear of every graphic element. Check each export at its final aspect ratio.

Crop

- Keep the complete visible face and the outline around the head in frame. Leave breathing room where the original allows it. Inspect the square, portrait feed, and Story crops separately.

Text placement

- Keep captions, logos, labels, panels, overlays, and Story stickers off faces. Reserve a separate field for copy when the image has little usable negative space.

Fallback

- Adjust the crop and check every face again. Fit the whole photo into the allocated area or choose another shot when a cover crop cuts a face.

Before export

- Review the final rendered asset, including any platform crop or interface overlay. Check the whole cast and give photo subjects priority over matching a fixed template.

Open the Instagram examples

## Video

[Open the working examples](https://brand.getshared.ai/artifacts/video)

Framing, reactions, and production specifications for Stage agents, illustrated with Juan’s studio.


### [A full-height Stage screen](https://brand.getshared.ai/artifacts/video#framing-title)

A translucent overlay gives slides, sketches and photos a quiet surface while letting the studio show through.

Screen area

- Right two-thirds

Overlay bounds

- 1280 × 1080 px

Master frame

- 1920 × 1080 px


#### [Framing stills](https://brand.getshared.ai/artifacts/video#framing)

Full-width frames from the existing Stage takes.


#### [Place the overlay](https://brand.getshared.ai/artifacts/video#screen-reserve)

Start at x = 640 in the master frame. Fade in from the left, keep the full height translucent, and inset the content so the room shows around it. Keep the area behind the content clear of people and moving props.


#### [Keep gestures clear](https://brand.getshared.ai/artifacts/video#gesture-clearance)

Keep the face, hands and working area at least 2% of the frame width left of the overlay. In the presenting take, turn the palm toward the screen and hold for two seconds within the left third.


#### [Check the framing](https://brand.getshared.ai/artifacts/video#responsive-framing)

Use the same overlay position for the seated, empty-room and writing keyframes. At wide, square and phone widths, keep the whole room visible and scale the media to fit.


### [Juan’s Stage takes](https://brand.getshared.ai/artifacts/video#juan-title)

Ten silent clips from the live Stage. Use the same set of movements and pose transitions for each agent.


#### [Presence](https://brand.getshared.ai/artifacts/video#presence-title)


##### [Entrance](https://brand.getshared.ai/artifacts/video#entrance-title)

5 s · Empty → seated

Juan walks in from his side of the frame and settles into the seated pose.


##### [Quiet idle](https://brand.getshared.ai/artifacts/video#idle-title)

15 s · Seated loop

The default listening look. Small blinks and breathing return to the same pose.


##### [Neutral motion](https://brand.getshared.ai/artifacts/video#neutral-title)

15 s · Seated → seated

A slightly livelier listening take with a breath and a settling nod.


##### [Exit](https://brand.getshared.ai/artifacts/video#exit-title)

5 s · Seated → empty

Juan unfolds his arms, rises and leaves on his side of the frame.


#### [Reactions](https://brand.getshared.ai/artifacts/video#reactions-title)


##### [Thinking](https://brand.getshared.ai/artifacts/video#thinking-title)

5 s · Seated → seated

A brief upward glance with a steady hold before he looks back.


##### [Agreement](https://brand.getshared.ai/artifacts/video#agreement-title)

5 s · Seated → seated

A low thumbs-up, followed by a return to the seated pose.


##### [Presenting](https://brand.getshared.ai/artifacts/video#point-title)

5 s · Seated → seated

Juan holds an open palm toward the screen side. The Stage places the screen above his hand.


#### [Writing](https://brand.getshared.ai/artifacts/video#writing-title)


##### [Start writing](https://brand.getshared.ai/artifacts/video#busy-in-title)

5 s · Seated → writing

Juan takes a pencil and settles into the writing pose.


##### [Writing loop](https://brand.getshared.ai/artifacts/video#busy-title)

5 s · Writing loop

Juan writes with his head down. The clip starts and ends in the same writing pose.


##### [Return from writing](https://brand.getshared.ai/artifacts/video#busy-out-title)

5 s · Writing → seated

Juan puts the pencil back and returns to the seated pose before speaking.


### [Production guide](https://brand.getshared.ai/artifacts/video#production-title)

Choose the setting, wardrobe and screen side before making keyframes. Use the reference take names and durations for each agent.


#### [Plan three matching keyframes](https://brand.getshared.ai/artifacts/video#reference-frames)

Approve the seated portrait with the screen area marked. Derive the empty room and writing pose from that image. Lock the camera, crop, lighting and props. Specify one observable action per take and the opening and closing pose. Entrance and exit happen on the agent’s side of the frame.


#### [Keep pose transitions repeatable](https://brand.getshared.ai/artifacts/video#clip-states)

Use the same approved seated frame where clips meet. Use the writing frame to join Start writing, Writing loop and Return from writing. Keep lips closed during the five seated takes used for live lip sync. Return to the seated pose before speech begins after writing.


#### [Export and record the takes](https://brand.getshared.ai/artifacts/video#export)

Use silent 1920 × 1080 H.264 MP4 at 24 fps. Keep the approved keyframes, motion directions, take versions and generation receipts with the exports. Record the frame coordinates of the screen and palm, and the time windows for gesture holds.


#### [Review takes and overlays together](https://brand.getshared.ai/artifacts/video#review)

Check each take at full speed and inspect the first and last frames side by side. Replay both loops twice. Review for jumps in pose, exposure or props, then check the screen clearance throughout every take, including entrance, exit and the full presenting gesture.

## Pixel studies

[Open the working examples](https://brand.getshared.ai/pixels)

One sunlit worktable, four ways to use a square. Stitch it into felt, fold it into a bird, build a set around it, or feed the pattern into a 1960s-style paper plotter.


### [The folded model](https://brand.getshared.ai/pixels#look-0)

The lighting reference. Soft skylight picks out paper edges, loose curls and the texture of the felt mat.


### [Stitch the surface](https://brand.getshared.ai/pixels#look-1)

A few stitched squares turn one wing into a repeatable patch. The quietest treatment keeps the original fold and framing.


### [Build the object](https://brand.getshared.ai/pixels#look-2)

A blue wing rises one paper cube at a time. From across the room it reads as a bird. Up close, you can see how it was folded.


### [Build the room](https://brand.getshared.ai/pixels#look-3)

The same square becomes a piece of scenery. A stepped sun and blue alcove give the workshop a silhouette of its own.


### [Tomorrow’s workshop](https://brand.getshared.ai/pixels#look-4)

The plotter prints a bird one square at a time. Its four coloured keys, paper feed and glowing lamp give the team something to operate together.


### [Paper pixel icons.](https://brand.getshared.ai/pixels#main)

The reply, waveform and bird now sit in a 24-icon set cut from the same square grid.


### [In the workshop](https://brand.getshared.ai/pixels#main)

Each agent gets an instrument that fits the work. The same skylight catches the paper feed, tape reels and seams in the listening dish.

Download the earlier five pixel-workshop photos
