set -e

# 세션 끝날 때 docker 내리도록 trap
cleanup() {
  echo "Stopping docker compose..."
  docker compose down
}
trap cleanup EXIT

docker compose up -d

npm install && \
npm run build && \
npm run start:dev
