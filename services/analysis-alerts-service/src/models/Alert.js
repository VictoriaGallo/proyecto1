export default class Alert {
  constructor({ id = null, userId, type, message, channel = "both", status = "pending", meta = {}, createdAt = Date.now() }) {
    this.id = id || `alert_${Date.now()}`;
    this.userId = userId;
    this.type = type;
    this.message = message;
    this.channel = channel; // 'email' | 'in-app' | 'both'
    this.status = status;
    this.meta = meta;
    this.createdAt = createdAt;
  }
}
