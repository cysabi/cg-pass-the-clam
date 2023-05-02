# `cq-pass-the-clam`
> A NodeCG graphics bundle.

![License][license-shield]
![Stars][stars-shield]

## Installation
1. Find the version you're looking for on the releases page, and download `cq-pass-the-clam.zip`.
1. Unzip the file and drag the folder into the `bundles/` subdirectory of your NodeCG installation.

## Running locally
1. Clone the repository into the `bundles/` subdirectory of your NodeCG installation.
1. `npm run watch` will build the bundle for NodeCG and watch for changes.
1. To build graphics for production:
    1. `npm run build --mode graphics`
    1. `npm run build --mode dashboard`
    1. Delete everything except for the `graphics/`, `dashboard/` directory and `package.json`.

---

Contact me · [**@LeptoFlare**](https://github.com/LeptoFlare) · [lepto.tech](https://lepto.tech)

_[https://github.com/LeptoFlare/cq-pass-the-clam](https://github.com/LeptoFlare/cq-pass-the-clam)_

<!-- markdown links & imgs -->
[stars-shield]: https://img.shields.io/github/stars/LeptoFlare/cq-pass-the-clam.svg?style=social
[license-shield]: https://img.shields.io/github/license/LeptoFlare/cq-pass-the-clam.svg?style=flat
