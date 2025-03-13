{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Add MongoDB to the shell environment
  packages = [ pkgs.mongodb ];

  shellHook = ''
    export MONGO_DATA_DIR="$PWD/mongodb-data"
    mkdir -p "$MONGO_DATA_DIR"
    echo "MongoDB data directory: $MONGO_DATA_DIR"
  '';
}