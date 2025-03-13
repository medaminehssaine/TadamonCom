{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = [ 
    pkgs.docker
   ];

  shellHook = ''
    echo "Starting MongoDB in Docker..."
    docker run -d -p 27017:27017 --name mongodb mongo:latest
    echo "MongoDB is running on port 27017"
  '';
}