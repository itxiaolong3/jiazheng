Component({
    properties: {
        stage: {
            type: Number,
            value: 1
        }
    },
    data: {
        activeNode: 0
    },
    attached: function() {
        var t = this.properties.stage;
        this.setData({
            activeNode: t
        });
    },
    methods: {}
});