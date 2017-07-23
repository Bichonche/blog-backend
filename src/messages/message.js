
class Message {
    constructor() {
        this.acknowledged = false;
        this.message = ''
        this.status = 200;
    }

    setStatus(i) {
        this.status = i ? i : 200;
        return this;
    }

    setMessage(m) {
        this.message = m ? m : "Default message";
        return this;
    }

    isAcknowledged(b) {
        this.acknowledged = b.isBoolean ? b : false;
        return this;
    }
}

module.exports  = new  Message();