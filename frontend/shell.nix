{ pkgs ? import <nixpkgs> {} }:

let
  androidSdk = pkgs.androidenv.composeAndroidPackages {
    cmdLineToolsVersion = "9.0"; # Use a valid version from the list
    platformVersions = [ "34" ];
    buildToolsVersions = [ "34.0.0" ];
    includeEmulator = false;
    includeSystemImages = false;
  };
in

pkgs.mkShell {
  buildInputs = [
    androidSdk.androidsdk
    # Other dependencies (JDK, Node.js, etc.)
    pkgs.jdk
    pkgs.nodejs
    pkgs.python312Packages.requests
    pkgs.python312Packages.flask

  ];

  ANDROID_HOME = "${androidSdk.androidsdk}/libexec/android-sdk";
  ANDROID_SDK_ROOT = "${androidSdk.androidsdk}/libexec/android-sdk";
}