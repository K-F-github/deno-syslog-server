# deno-syslog-receiver

📥 A lightweight UDP syslog receiver written in Deno. Logs messages into files based on date.  
📘 使用 Deno 編寫的輕量級 UDP Syslog 接收器，依照日期將訊息寫入 log 檔案。

---

## ✨ Features | 功能特色

- 📡 Listens for UDP syslog messages (default port: `514`)
- 📁 Logs are saved under `/log/YYYY-MM-DD.txt`
- 🧠 Parses priority (PRI) values from syslog format
- ⚙️ Command-line configurable (port, logsite, console filter)

---

## 🚀 Usage | 使用方式

### 1. 執行程式

```bash
deno run --allow-net --allow-write --unstable-net syslog_udp_server.ts --port=514 --console=true 150,141
```

### 2. 參數說明

| 參數         | 說明                                  |
|--------------|---------------------------------------|
| `--port=514` | 設定監聽的 UDP 通訊埠（預設：514）   |
| `--console`  | 是否印出收到的 syslog 到畫面(預設：true)          |
| `--log`     | 設定輸出資料夾 (預設："./log")          |
| `150 141`     | 僅存指定PRI代碼資料(預設：不指定就儲存全部)       |

---

## 📦 Compile to Binary | 編譯為可執行檔

```bash
deno compile --allow-net --allow-write --unstable-net syslog_udp_server.ts
```

> 若在 ARM 裝置編譯：請加上 `--target` 參數，例如：  
> `--target=aarch64-unknown-linux-gnu`

---

## 📁 Log Format | 紀錄格式

- 檔案儲存位置：`./log/YYYY-MM-DD.txt`
- 每筆訊息格式：
  ```
  [HH:MM:SS] <PRI=30> 來自 192.168.1.1: hello world
  ```

---

## 🧾 Syslog PRI 說明
依據Draytek 2927
| PRI | 類別       | 說明       |
| --- | -------- | -------- |
| 150 | User     | 使用者操作記錄  |
| 134 | Firewall | 防火牆事件    |
| 158 | Call     | 通話/連線記錄  |
| 166 | WAN      | 廣域網路事件   |
| 198 | WLAN     | 無線網路事件   |
| 141 | VPN      | VPN 相關活動 |
---
## 💻 Example Output | 執行畫面範例

```bash
📥 192.168.1.256 ➜ <PRI=30> sshd[1234]: Accepted password for user
```

