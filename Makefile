SHELL = bash
NODE = $(shell which node)
NPM = $(shell which npm)
HR = node_modules/.bin/hr.js

.PHONY: all

all: doc
	@echo ==== Done ====

doc:
	@echo ==== Build ====
	$(HR) -d src build
	@echo

run:
	@echo ==== Build and Run ====
	$(HR) -d src all
	@echo

install:
ifeq ($(NPM),)
		@echo -e "npm not found.\nInstall it from https://npmjs.org/"
		@exit 1
else
		$(NPM) install .
endif
