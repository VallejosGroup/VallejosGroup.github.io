FROM ubuntu:latest
LABEL maintainer="Vallejos Group"
LABEL description="Docker image for Jekyll site with Tailwind CSS and PostCSS"
LABEL version="1.0"

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

SHELL ["/bin/bash", "-c"]

RUN apt update && apt install -y \
    build-essential \
    git \
    nodejs \
    npm \
    ruby-full \
    zlib1g-dev \
    default-jre \
    software-properties-common \
    curl \
    gpg \
    imagemagick

# Install RVM using official method
RUN gpg --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
RUN curl -sSL https://get.rvm.io | bash -s stable && \
    usermod -a -G rvm root && \
    echo "source /etc/profile.d/rvm.sh" >> ~/.bashrc && \
    source /etc/profile.d/rvm.sh && \
    rvm install "ruby-3.3.0" && \
    rvm use 3.3.0 --default && \
    gem install bundler && \
    gem install jekyll
RUN mkdir -p /website
WORKDIR /website
COPY render.sh render.sh
RUN chmod +x render.sh
CMD ["/bin/bash", "./render.sh"]
