# Thirds Tiler

A KWin script for window managment

## Important Shortcut Activation Note

When you register a shortcut using `registerShortcut()` inside a KWin script,
it typically only adds the entry to the system. To make the shortcuts functional,
open System Settings and navigate to Keyboard ➔ Shortcuts ➔ KWin. Look up
"Cycle 1/3 Width", "Cycle 2/3 Width", and "Center 3/5 Width" and ensure they are
enabled and bound to Meta+D, Meta+F, and Meta+G, respectively.

## Active Scrip

search  `kwin scripts` in settings and enable the plugin

## Check, install, and update

Run these from the project directory:

- `make check` validates the package metadata and main script path, and checks JavaScript syntax when Node.js is installed.
- `make install` checks the package, then installs it with `kpackagetool6`.
- `make update` checks the package, then updates it with `kpackagetool6`.

Installing or updating requires KDE's `kpackagetool6` to be available.

## Post install

Plasma needs to be restarted after and update of the script

`kwin_wayland --replace & disown`
