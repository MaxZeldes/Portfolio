/* Tweaks for the Blueprint portfolio — three expressive axes:
   · palette    (drawing surface)
   · substrate  (background pattern)
   · annotation (drafting chrome density)
*/

const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;

function BlueprintTweaks() {
  // pull defaults out of the inline TWEAK_DEFAULTS block so the host can persist
  const defaults = (window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS) || {
    palette: 'blueprint',
    substrate: 'grid',
    annotation: 'full',
  };
  const [t, setTweak] = useTweaks(defaults);

  // mirror state onto <body> data-attributes — CSS does the rest
  React.useEffect(() => {
    document.body.dataset.palette = t.palette;
    document.body.dataset.substrate = t.substrate;
    document.body.dataset.annotation = t.annotation;
  }, [t.palette, t.substrate, t.annotation]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Drawing surface">
        <TweakRadio
          label="Palette"
          value={t.palette}
          options={[
            { value: 'blueprint', label: 'Blueprint' },
            { value: 'paper',     label: 'Paper' },
            { value: 'terminal',  label: 'Terminal' },
          ]}
          onChange={(v) => setTweak('palette', v)}
        />
      </TweakSection>

      <TweakSection label="Substrate">
        <TweakRadio
          label="Pattern"
          value={t.substrate}
          options={[
            { value: 'grid',  label: 'Grid' },
            { value: 'dots',  label: 'Dots' },
            { value: 'hatch', label: 'Hatch' },
            { value: 'clean', label: 'Clean' },
          ]}
          onChange={(v) => setTweak('substrate', v)}
        />
      </TweakSection>

      <TweakSection label="Annotation">
        <TweakRadio
          label="Drafting chrome"
          value={t.annotation}
          options={[
            { value: 'full',  label: 'Full' },
            { value: 'light', label: 'Light' },
            { value: 'clean', label: 'Clean' },
          ]}
          onChange={(v) => setTweak('annotation', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// mount into a host node at the end of body
const _twkRoot = document.getElementById('tweaks-root');
if (_twkRoot) ReactDOM.createRoot(_twkRoot).render(<BlueprintTweaks />);
