# Cogxioms — 60–70s corporate commercial

Production pack for generating the film with a text-to-video model
(Sora, Veo, Runway Gen-4, Kling, Pika) or handing to a crew for a real shoot.

The brief was written as one continuous piece. Every current video model caps at
5–10 seconds per clip and carries **no memory between calls**, so it is split
into seven self-contained shots below. Each one restates the location, wardrobe,
camera, grade and lens, because the model will not remember shot 1 when you run
shot 2. Skipping that is the single biggest cause of the office changing colour
halfway through a reel.

---

## Three things to decide before you generate anything

**1. The logo cannot go in the generated footage.**
The brief asks for it on the reception wall, glass meeting room, laptop stickers,
coffee mugs, badges and the presentation screen. A generative model will warp it
on every one of those surfaces — wrong node count, wrong proportions, invented
letterforms. That breaks the "never recreate or modify the logo" rule in the most
visible way possible.

Two options that hold the rule:
- **Leave it out of the prompts entirely** (what the shot list below does) and let
  the brand live only in the composited reveal.
- Generate clean surfaces, then **track and composite** the real `logo.png` onto
  the wall / mug / badge in post. Correct, but it is a VFX job per shot.

**2. Screen content will be illegible.**
No model renders real UI. Ask for "Visual Studio Code showing React" and you get
plausible-looking code-shaped noise that falls apart on a still. Two ways through:
- Shoot the monitors **shallow and off-axis** so screens read as soft light rather
  than readable text. The brief already wants shallow depth of field and focus
  pulls, so this is on-style, and it is what real commercials do.
- Or generate the room with **blank/defocused monitors** and composite genuine
  screen recordings of your actual stack in post. Sharpest result, most work.

The prompts below take the first route and say so explicitly, because a model told
to render legible code will produce text artifacts every time — which is on your
own negative list.

**3. The final reveal is already built and should not be generated.**
`scratchpad/out/reveal.mp4` — composited from the real `public/logo.png`, 1920×1080,
30fps, 10.5s. Fade in, 100%→103% zoom, the three text beats, three-second hold,
fade to black. No glow, no particles. Append it to the stitched footage.

---

## Shared style block

Prepend or append this to **every** shot prompt. Consistency across clips comes
from repeating it verbatim, not from varying it.

> Shot on a Sony FX3 with a 35mm prime, 4K, 30fps, 16:9. Natural daylight through
> large windows, soft shadows, no practical accent lighting. Modern software
> company office: pale oak desks, matte white walls, dark grey acoustic panels,
> potted plants, glass partitions. Colour grade is modern neutral — clean whites,
> soft blues, natural skin tones, no saturation push. Shallow depth of field.
> Movement is a slow dolly with subtle handheld weight. Real people in smart-casual
> clothing, natural unposed behaviour, no eye contact with camera. Documentary
> realism, as if filmed by a professional commercial crew.

## Shared negative prompt

Append to every shot:

> cartoon, anime, CGI, 3D render, AI generated appearance, holograms, glowing UI,
> floating interfaces, cyberpunk, neon lights, robots, sci-fi effects, blue glowing
> graphics, fake futuristic interfaces, overdramatic animation, distorted hands,
> extra fingers, duplicate people, deformed faces, plastic skin, unrealistic
> reflections, excessive motion blur, stock footage look, oversaturated colours,
> unrealistic office, low quality, blurry, watermark, on-screen text, text
> artifacts, legible code on monitors, logos, signage, poor anatomy, warped
> architecture, unrealistic camera movement

---

## SHOT 1 — Exterior into the office · 10s · 35mm

> Slow dolly forward toward the glass entrance of a modern low-rise technology
> office on a bright overcast morning, then a continuous push through the doors
> into an open-plan workspace. Two developers in their late twenties sit at a
> shared desk, one gesturing at a monitor while the other types. Monitors are
> angled away from camera and sit out of focus, reading as soft cool light rather
> than readable content. Natural ambient movement of other staff in the deep
> background, softly defocused.

Overlay in post: `Custom AI Software Development`

## SHOT 2 — Mobile testing at the desk · 10s · 50mm

> Slow slider move left to right past a desk where an engineer holds a smartphone
> tethered by cable to a laptop, glancing between the phone and the laptop screen
> as she tests. Rack focus from the phone in the foreground to her face. Behind
> her a second monitor glows softly out of focus. A colleague leans in briefly and
> they exchange a few words, relaxed and unhurried. Screens are defocused and
> non-legible throughout.

Overlay in post: `AI Mobile Applications` → `Intelligent Software Solutions`

## SHOT 3 — Automation workstation · 10s · 35mm

> Slow dolly in behind a developer's shoulder at a two-monitor workstation, the
> screens heavily defocused in the foreground blur while he leans back, watches,
> then makes a small note on a paper pad. A manager stops beside the desk, they
> look at the screen together and one of them nods. Warm daylight rakes across the
> desk from a window on the left. Subtle handheld drift.

Overlay in post: `Data Scraping` → `Workflow Automation` → `Real-Time Data Collection`

## SHOT 4 — Backend engineering · 10s · 50mm

> Slow lateral slider across a quiet corner of the office where a backend engineer
> works alone at a standing desk, one hand on a mouse, the other holding a coffee
> cup. Rack focus from the defocused monitor in the foreground to her face, then a
> small satisfied reaction as something completes. A phone lies face-up on the desk
> beside the keyboard. Glass partition behind her with a meeting visible through it,
> softly out of focus.

Overlay in post: `API Integration` → `Secure Connectivity` → `Enterprise Automation`

## SHOT 5 — Analytics meeting room · 10s · 35mm

> Slow arcing dolly into a glass-walled meeting room where four colleagues sit
> around a pale oak table in conversation, one standing and gesturing toward a
> large wall-mounted display. The display is angled away from camera and stays out
> of focus, reading as soft light and colour. Natural daylight from a window wall
> on the right, soft shadows across the table. Laptops open on the table. Genuine
> unposed discussion, occasional nods and small smiles.

Overlay in post: `Predictive Analytics` → `Machine Learning` → `Forecasting`

## SHOT 6 — Executive presentation · 10s · 35mm

> Slow dolly forward into a bright presentation room. A woman in her forties stands
> beside a large display, mid-sentence, turning slightly toward three seated
> colleagues. Camera drifts past a seated colleague's shoulder in the foreground,
> softly blurred. The display is defocused and off-axis. Clean white walls, natural
> daylight, no artificial accent lighting. Relaxed, confident body language.

Overlay in post: `Data Visualization` → `Interactive Reporting` → `Actionable Insights`

## SHOT 7 — Client success montage · 6s · 50mm

> Four brief handheld fragments in the same office, each roughly one and a half
> seconds: hands typing on a mechanical keyboard in shallow focus; two colleagues
> laughing over a laptop; a handshake between two people standing near a window;
> a wide shot of the open-plan floor with staff moving naturally. Consistent natural
> daylight and neutral grade across all four. Subtle handheld weight, no whip pans.

Overlay in post: `Building Intelligent Digital Solutions` → `Trusted Technology Partner`

---

## Assembly

Seven clips ≈ 66s, plus the 10.5s reveal ≈ 76s total. Trim shots 1–7 to taste to
land in the 60–70s window before appending the reveal.

Typography is deliberately **not** in the prompts — a model asked for on-screen
text produces artifacts, which your own negative prompt rules out. Add the overlays
in post as minimal white type with slow fades, no borders, no motion.

Once you have the seven clips, drop them in a folder and I can do the assembly:
concatenate, apply the typography overlays with matched fade timing, append the
reveal, colour-match across cuts, and encode to web-sized `webm` + `mp4` + poster
for the site.
