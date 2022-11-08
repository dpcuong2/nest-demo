-- CreateTable
CREATE TABLE "ProjectList" (
    "projectid" VARCHAR NOT NULL,
    "projectname" VARCHAR,
    "projecttype" VARCHAR,
    "publlishsetting" INTEGER,
    "startday" TIMESTAMP(6),
    "endday" TIMESTAMP(6),
    "created_date" INTEGER,
    "updated_date" INTEGER,
    "created_by_user_id" INTEGER,
    "updated_by_userid" INTEGER,

    CONSTRAINT "projectlist_pk" PRIMARY KEY ("projectid")
);

-- CreateTable
CREATE TABLE "TemplateList" (
    "template_id" VARCHAR,
    "template_name" VARCHAR,
    "template_type" VARCHAR,
    "publish_flag" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "created_by_user_id" INTEGER,
    "updated_by_user_id" INTEGER
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL,
    "email" VARCHAR(200),
    "password" VARCHAR,
    "name" VARCHAR,
    "create_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
