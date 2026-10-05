.PHONY: check install update

PACKAGE_TYPE := KWin/Script

check:
	@python3 -c 'import json, pathlib; metadata=json.loads(pathlib.Path("metadata.json").read_text()); main=pathlib.Path("contents") / metadata["X-Plasma-MainScript"]; assert main.is_file(), f"Missing main script: {main}"; print("Package metadata and main script are valid.")'
	@if command -v node >/dev/null 2>&1; then \
		node --check contents/code/main.js; \
	else \
		echo "Skipping JavaScript syntax check (node is not installed)."; \
	fi

install: check
	kpackagetool6 -t $(PACKAGE_TYPE) -i ./

update: check
	kpackagetool6 -t $(PACKAGE_TYPE) -u ./
