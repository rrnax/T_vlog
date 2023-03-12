<template>
  <div class="post-comments">
    <div class="comment-info">
      <div class="auth">
        <p>{{this.author}}</p>
        <p> | </p>
        <p>{{renderDate()}}</p>
      </div>
      <div v-if="!editable" class="comment-operations">
        <p class="ops"
           v-if="user.id === this.comment.user_id"
           @click="this.editable = !this.editable">Edytuj</p>
        <p v-if="user.id === this.comment.user_id"> | </p>
        <p class="ops"
           v-if="user.id === this.comment.user_id || user.role === 2"
           @click="sendDestroy">Usuń</p>
      </div>
      <div v-if="editable" class="comment-operations">
        <p class="ops" @click="editComment">Zapisz</p>
      </div>
    </div>
    <div class="comment-body">
      <p v-if="!editable">{{this.comment.body}}</p>
      <textarea v-if="editable" class="edit-comment">{{this.comment.body}}</textarea>
    </div>
  </div>
</template>

<script>
import {findUser} from "@/components/authentication/handleUsers";
import moment from 'moment'
import {delateComment, updateComment} from "@/components/articles/comments/handleComments";

export default {
  name: "Comment",

  data() {
    return {
      author: "",
      editable: false
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
      if(info.correct) {
        this.$emit('refreshComments');
      }
      console.log(info);
    },

    async editComment(){
      let info = {}, temp = {};
      temp.id = this.comment.id;
      temp.body = document.querySelector(".edit-comment").value;
      info = await updateComment(this.restUrl, temp);
      if (info.correct) {
        this.comment.body = temp.body;
        this.editable = !this.editable;
      }
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

.edit-comment {
  width: 90%;
  height: 50px;
}

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