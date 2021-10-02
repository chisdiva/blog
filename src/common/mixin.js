import {debounce} from "@/common/util";

export const myScroll = {
    data() {
        return {
            isBottom: false,
            isScroll:false,
            scrollTop: 0,
            current: 0
        }
    },
    mounted() {
        document.onscroll = debounce(this.scrollListener, 200)
    },
    methods: {
        scrollListener() {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isScroll = this.scrollTop > 200;
            //判断是否上拉到底
            if(Math.round(this.scrollTop) + document.documentElement.clientHeight === document.documentElement.scrollHeight
            ) {
                this.isBottom = true
            }
        },
        //返回顶部
        backTopClick(compElId) {
            // document.documentElement.scrollTop = 0;
            const compEl = document.querySelector(`#${compElId}`)
            compEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        },
    },
    watch: {
        isBottom: function () {
            if (this.isBottom) {
                this.current++;
                this.isBottom = false;
            }
        }
    }

}
