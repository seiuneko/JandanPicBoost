#!/usr/bin/sh

build() {
  target=$1

  version=$(jq -r .version "$target"/manifest.json)
  web-ext build -s "$target" -n JandanPicBoost_v"$version"_"$target".zip
}

target=$1
if [ -z "$target" ]; then
  echo "Usage: build.sh [all|chrome|firefox]"
  exit 1
fi

if [ "$target" = "all" ]; then
  build chrome
  build firefox
else
  build "$target"
fi