# 验证记录

日期：2026-10-17（Asia/Shanghai）。

## 安装与编译

- 依赖版本固定，提供 npm lockfile v3；依赖下载地址规范化为 npm 官方 registry，保留对应 integrity 校验值。
- 在独立空目录复制 `package.json` 和 `package-lock.json` 后，执行 `npm ci --offline --no-audit --no-fund`，成功安装 255 个包。离线校验使用本机已下载缓存。
- `npm run typecheck` 通过。
- 使用本机 Chrome 完整渲染 902 帧；未使用远程字体、在线图像或参考视频画面。

## 输出检查

- 视频流：H.264、1280×720、30 fps、902 帧，视频流长度 30.066667 秒。
- 音频流：AAC，长度 30.080 秒；容器长度 30.080 秒，差异来自音频编码帧的边界。
- 对完整 MP4 执行 FFmpeg 解码检查，无解码错误。
- 检查覆盖素材导入、对焦、转场、字幕、调色、节拍、导出和结尾。
- 检查结尾手机及角色的残影，并修正淡出处理。

## 发布前检查

- 只提交源码、依赖锁文件、文档、本地字体及音轨。
- 输出视频和依赖目录由 `.gitignore` 排除。
- 未包含绑定凭证、签名下载地址或 GitHub 访问凭证。
- 参考原片保留在仓库外，未提交。

## 可重复验证

```bash
npm ci
npm run typecheck
npm run render
ffprobe -v error -show_streams -show_format out/claude-editor.mp4
ffmpeg -v error -i out/claude-editor.mp4 -f null -
```
