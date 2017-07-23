const Schema = {
    users: {
        id: {type: 'string', nullable: false, primary: true},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true},
        name: {type: 'string', maxlength: 150, nullable: false},
        surname: {type: 'string', maxlength: 150, nullable: false},
        username: {type: 'string', maxlength: 150, nullable: false, unique: true},
        password: {type: 'string', maxlength: 150, nullable: false},
    },
    categories: {
        id: {type: 'string', nullable: false, primary: true},
        name: {type: 'string', maxlength: 150, nullable: false}
    },
    posts: {
        id: {type: 'string', nullable: false, primary: true},
        user_id: {type: 'string', nullable: false, },
        category_id: {type: 'string', nullable: false},
        title: {type: 'string', maxlength: 150, nullable: false},
        slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
        html: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    },


    tags: {
        id: {type: 'string', nullable: false, primary: true},
        slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
        name: {type: 'string', maxlength: 150, nullable: false}
    },


    posts_tags: {
        id: {type: 'string', nullable: false, primary: true},
        post_id: {type: 'string', nullable: false, },
        tag_id: {type: 'string', nullable: false}
    },

    comments : {
        id: {type: 'string', nullable: false, primary: true},
        user_id: {type: 'string', nullable: false,},
        text: {type: 'text', maxlength: 16777215, fieldtype: 'medium', nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    }
};
module.exports = Schema;