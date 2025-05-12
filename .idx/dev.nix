{ pkgs, ... }: {

  channel = "stable-23.11";
  services.docker.enable = true;

  packages = [
    pkgs.bun
  ];

  env = { };

  idx.workspace.onCreate = {
    npm-install = "bun install";
  };

  idx.extensions = [
    "anilkumarum.compile-ts"
    "esbenp.prettier-vscode"
    "yoavbls.pretty-ts-errors"
  ];
}
