<template>
  <div class="post-comments">
    <div class="comment-info">
      <div class="auth">
        <p>{{this.author}}</p>
        <p> | </p>
        <p>{{renderDate()}}</p>
      </div>
      <div class="comment-operations">
        <p class="ops">Edytuj</p>
        <p> | </p>
        <p class="ops" @click="sendDestroy">Usuń</p>
      </div>
    </div>
    <div class="comment-body">
      <p>{{this.comment.body}}</p>
    </div>
  </div>
</template>

<script>
import {findUser} from "@/components/authentication/handleUsers";
import moment from 'moment'
import {delateComment, getCommentsToPost} from "@/components/articles/comments/handleComments";

export default {
  name: "Comment",

  data() {
    return {
      author: ""
    }
  },

  props: {
    restUrl: String,

    user: {
      type: Object,
    },

    comment: {
      type: Object,
    }
  },


  methods: {
    async sendDestroy(){
      let info ={}, temp = {};
      info = await delateComment(this.restUrl, this.comment);
      console.log(info);
    },

    renderDate(){
      return moment(String(this.comment.updated_at)).format('MM.DD.YYYY HH:mm');
    },
  },

  async created() {
    let temp = await findUser(this.restUrl, this.comment.user_id);
    this.author = temp.user.email;

  }
}
</script>

<style scoped>

.post-comments {
  width: 90%;
  margin: 20px auto;
  border-top: grey solid 2px;
}

.comment-info {
  display: flex;
  justify-content: space-between;
}

.auth {
  width: 50%;
  display: flex;
  justify-content: start;
}

p {
  margin-right: 10px;
}

.comment-operations {
  width: 50%;
  display: flex;
  justify-content: end;
  color: dimgrey;
}

.ops {
  cursor: pointer;
  text-decoration: underline;
}


</style>