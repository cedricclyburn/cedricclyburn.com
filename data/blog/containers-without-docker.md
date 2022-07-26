---
title: Containers without Docker (podman, buildah, and skopeo)
date: '2022-07-20'
tags: ['containers', 'docker', 'podman']
draft: false
summary: Are there alternatives to Docker? Yes, and let's take a look at how we can get started with Podman, Buildah, and Skopeo.
authors: ['default']
---

While [Docker](https://www.docker.com/) is commonly the standard when it comes to containers, we're starting to see why alternatives like [Podman](https://podman.io/) are quickly becoming popular replacements for container-based development. Although Docker has been around for almost 10 years and standardized containerization, Podman has some huge advantages, namely being "[daemonless](https://medium.com/easyread/daemonless-container-engine-5364394b80ec)" (not needing `systemd` or any other service to run in the background). Are there alternatives to Docker? Yes, and let's take a look at how we can get started with Podman, Buildah, and Skopeo.


## Introduction

Docker has been an innovator in how developers build and deploy applications, and is a good tool. From building images, pushing/pulling images from registries, and running images, Docker does it all. However, Docker is a [huge monolithic application](https://martinheinz.dev/blog/35) and relies on a heavy daemon, which, if at a point failed, all child processes would become unreachable. 

![Differences between the architecture of Docker and Podman](https://lh4.googleusercontent.com/vZlRKQINPgO6RJ6ks8S5JxkZiCMw932F5dw16ttzAw9Jxt4h1aWJWjRbyyaeCnAISovILy81KXHtO-jOmVS2074r8pZ8jQR8lUrQhp0leG9ofI_f0Z2l7ib_GSWaMcf_36zEm1_3M7_vLLOcgMDAdcE)

This is what Podman, an open-source daemonless and rootless container engine, was developed with in mind. Podman runs using the [runC](https://github.com/opencontainers/runc) container runtime process, directly on the Linux kernel, and launches containers and pods as child processes. In addition, it was developed for the Docker developer, with most commands and syntax seamlessly mirroring Docker's. [Buildah](https://buildah.io/), an image builder, and [Skopeo](https://github.com/containers/skopeo), the image utility tool, are both complimentary to Podman as well, and extend the range of operations able to be performed.

Due to Docker being such a large tool, we can break it down into a few components, mainly, this includes the container engine, image builder, and image distribution. Instead of relying on Docker, let’s take a look at some light-weight replacements that can achieve the same functionality.


## Podman

![Podman logo](https://lh5.googleusercontent.com/nWn4PK7jIJ36O_Qf4r5QvRKguci7qJwu51ZisfAu5W7ZonwNFzSCK8lfujSCunIxI2i0pnBVi0Lsr4u4Wmd8S4THaLcOqdKY3RTcwcfSlFnc7xol7MMOo6sDXAi3hBKEE1Ntk0-M53bfBq9YMpU)

[Podman](https://podman.io/) is a daemonless and rootless container engine, allowing you to run, manage, and interact with containers. The commands are the same as Docker due to the standards of the [Open Container Initiative](https://opencontainers.org/) (OCI), and you can even alias Docker to Podman (`alias docker=podman`). While the Docker daemon normally runs as root, a long-standing security concern, Podman can be run in rootless mode. Podman even includes the functionality to [orchestrate containers with Kubernetes](https://developers.redhat.com/blog/2019/01/29/podman-kubernetes-yaml#enough_teasing__show_me_the_goods)!


### Getting started with Podman

- Firstly, let’s install Podman. Based on your runtime, you can use the various installation methods in the [documentation](https://podman.io/getting-started/installation.html). You can even easily use Podman on Mac using `brew install podman` and Windows using this [blog](https://www.redhat.com/sysadmin/run-podman-windows).

```
$ sudo dnf -y install podman
```

- Run a httpd container

```
$ podman run -dt -p 8080:80/tcp docker.io/library/httpd

Trying to pull docker.io/library/httpd:latest...
Getting image source signatures
Copying blob d6bc17b4451a done 
…
```

- Check container status

```
$ podman ps

CONTAINER ID  IMAGE                           COMMAND           CREATED         STATUS             PORTS                 NAMES

5d5f92a59ea3  docker.io/library/httpd:latest  httpd-foreground  24 seconds ago  Up 25 seconds ago  0.0.0.0:8080->80/tcp  happy_beaver
```

- Access your application! We could simply do a `curl` command, or access the IP of our application with port 8080 on a browser, and we’ll see our `httpd` server running.

```
$ curl localhost:8080

<html><body><h1>It works!</h1></body></html>
```

![Working webpage using httpd](https://lh6.googleusercontent.com/SB5YjKBc4ZKYl6INn2XH8-z6Kk_Tyd6zrEfaH8KGU2QtlcwGGQ8IltPmodvd4hdPpXRyxX2ieIDUfg9subopfW3QwB8dWhz8cSFUXyoEgZEMQv4Glc5MCk_hzY7dkfSVFo-QNPuoISNTe5H178S52wM)


## Buildah

![Buildah logo](https://lh5.googleusercontent.com/vyju91y_OxXpkaGHuFjnsrnIsxcJq5m1Rvnl-VmgdjFhqWYpVerzKl9tQGmk360bfkmrAgxInoLQyh4fKTAOlvYANUY2jbHsKe2w7p-8BApYhFdNjzLMBP3MnzzvgHvpgDfoKy_oZh_EeKfG-hy3MEk)

[Buildah](https://buildah.io/) is a daemonless and rootless image builder tool complimentary to Podman that produces OCI compliant images. It’s able to build images from `Dockerfile`, and can be run directly inside of containers.


### Getting started with Buildah

- Let’s install Buildah, which can be done by checking the [installation documentation](https://github.com/containers/buildah/blob/main/install.md). Just like Podman, Buildah is shipped on Fedora 35/36, RHEL 8+, CentOS, OpenSUSE, and Ubuntu, and more.

```
$ sudo dnf -y install buildah
```

- Build an image from `Dockerfile`. While the default command to build any container image is `buildah bud -t tag-name .` in a directory with a `Dockerfile`, let’s say we’re working on a Next.js application. Firstly, let’s download the bootstrap using `npx`.

```
$ npx create-next-app --example with-docker nextjs-docker

$ cd next-js docker
```

- Now, we’ve got a Next.js application, with a Dockerfile inside ready to build our app. Let’s go ahead and build our container image.

```
$ buildah build -t nextjs-docker .

[1/3] STEP 1/5: FROM node:16-alpine AS deps

Resolved "node" as an alias (/etc/containers/registries.conf.d/000-shortnames.conf)

Trying to pull docker.io/library/node:16-alpine…

Successfully tagged localhost/nextjs-docker:latest
```

- Check image status.

```
$ buildah images

REPOSITORY               TAG         IMAGE ID      CREATED         SIZE

localhost/nextjs-docker  latest      162bee38beb9  8 seconds ago   118 MB
```

- Run container and check the installation, looks great!

```
$ podman run -p 3000:3000 nextjs-docker
```

![Example of Next.js viewable in browser](https://lh4.googleusercontent.com/JjoF5N0mfyJOOMa4scURKo9GSG69aCSwAwlyK3k5GRbIWmmVM_OSU4GmZ342xFqkRyu9qFzSFq2Ul4n_vxp-t67f2kT5WCOvLPldpe8CR-xNUWUH5dGGBCF3X9KwKPDnvhvU1NGEvU4Wt1cJShswTjs)


## Skopeo

![Skopeo logo](https://lh5.googleusercontent.com/v_dZWerfvOUU6VBUyRq_uHEA5sQ3tvmK8ts8zWVkUvabtYj5S3Kh_-mrZfATojrIz2YF3XhDMciVui6gOUezwFCozAnKb_FsAK8xjJcCNoPqlkY45QXVW5GJLruz8bCCAA5VttG-Da740PE8ADZdPNw)

[Skopeo](https://github.com/containers/skopeo) is an image utility tool that complements Podman and Buildah, allowing you to remotely inspect images, copy images between registries, and more. Like the others, it doesn’t require a daemon to be running or root privileges, and can work with OCI compatible images.

### Getting started with Skopeo

- Let’s install Skopeo, which can be done using the [installation documentation](https://github.com/containers/skopeo/blob/main/install.md).

```
$ sudo dnf -y install skopeo
```

- Push our image to a remote registry. If we haven’t already done so, let’s upload the image we just built with Buildah to the Docker hub.

```
$ podman login docker.io

$ podman push nextjs-docker docker.io/cedricclyburn/nextjs-docker
```

![View of image in Docker Hub](https://lh5.googleusercontent.com/Wq1VXraDxBb2CNCRl0GuWfuoPQgDvJEbVxly6PtCLljxY9ApCaZg81C0JAiwX4z7YdzYFLBzyyVnHltRYxhqyLDASFfzHJzZucPDco3NgkbHpVNoG-nzutOekCOb-BtVMFjAQ50E8TxK9Dr8TbH-Jrk)

- Copy image to a different registry. Recently, Docker Hub rate limits and paid tier changes have encouraged engineers to start using alternative image registries like Quay.io. Let’s take our existing image from Docker, and copy it over to Quay.io.

```
$ skopeo login quay.io

$ skopeo copy docker://cedricclyburn/nextjs-docker:latest docker://quay.io/cedric-clyburn/nextjs-docker:latest
```

![View of image in Quay.io](https://lh3.googleusercontent.com/nSsgA886rNPKwEvZD1qe84Gsg0K6ZPCSxXiMtMpDIPLkeHtstZiwqbFWVhv_iV5VAkozyLErqdobDQEpqE3mxZgLvETN6eO0Clc_1Zn9S5s0x_hZ_ttdt0bTrBpPYXI2KY3ffrmGPZjgPkGuGfGu66U)

- Inspect the image. Skopeo allows us to inspect properties or configuration of an image on remote repositories using `skopeo inspect`.

```
$ skopeo inspect docker://quay.io/cedric-clyburn/nextjs-docker

{

    "Name": "quay.io/cedric-clyburn/nextjs-docker",

    "Digest": "sha256:779bf91bd2d407b4db9e7e7035cc77dfbd0f2cbd435067a40f485960d2889ded",

    "RepoTags": \[

        "latest"

    ],

    "Created": "2022-07-19T18:30:29.872420186Z",
…
```

## Conclusion

As we’ve seen, you can use Podman, Buildah, and Skopeo as replacements to the traditional Docker workflow, without the use of a daemon or root privileges. There are plenty of great advantages that result from using these tools, and due to the increase of developer adoption there’s only more to come. I believe there’s a future for containers without Docker, and Podman (as well as the Buildah and Skopeo family) is a great alternative to work with.

> Note: This content comes from one of my DevNation Tech Talks, and the full presentation + slides can be found [here](https://developers.redhat.com/devnation/tech-talks/containers-without-docker)!
