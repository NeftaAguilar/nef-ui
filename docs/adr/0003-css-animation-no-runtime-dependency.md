# Animate with CSS in the library; keep Motion in the apps

Radix Primitives expose `data-state` attributes that CSS keyframes can drive, so
enter/exit animation needs no JavaScript. Adding the Motion library here would
push a runtime animation dependency onto every Consumer to buy nothing they
cannot already get.

Motion belongs in the demo and portfolio applications, where layout animation,
shared-element transitions and gestures actually need it — and where a reader can
see them.
