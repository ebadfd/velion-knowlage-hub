/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const app_controller_1 = __webpack_require__(8);
const app_service_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(10);
const users_module_1 = __webpack_require__(53);
const offices_module_1 = __webpack_require__(62);
const ideas_module_1 = __webpack_require__(69);
const reviews_module_1 = __webpack_require__(77);
const projects_module_1 = __webpack_require__(83);
const rewards_module_1 = __webpack_require__(93);
const audit_module_1 = __webpack_require__(101);
const entities_1 = __webpack_require__(13);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_DATABASE', 'velion_dkn'),
                    entities: [
                        entities_1.User,
                        entities_1.Role,
                        entities_1.Office,
                        entities_1.Idea,
                        entities_1.Category,
                        entities_1.Attachment,
                        entities_1.Comment,
                        entities_1.Vote,
                        entities_1.Review,
                        entities_1.Project,
                        entities_1.Milestone,
                        entities_1.ProgressUpdate,
                        entities_1.Evaluation,
                        entities_1.Nomination,
                        entities_1.Reward,
                        entities_1.AuditLog,
                    ],
                    synchronize: configService.get('DB_SYNCHRONIZE', 'true') === 'true',
                    logging: configService.get('DB_LOGGING', 'false') === 'true',
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            offices_module_1.OfficesModule,
            ideas_module_1.IdeasModule,
            reviews_module_1.ReviewsModule,
            projects_module_1.ProjectsModule,
            rewards_module_1.RewardsModule,
            audit_module_1.AuditModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(9);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return ({ message: 'Hello API' });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(12);
const config_1 = __webpack_require__(6);
const entities_1 = __webpack_require__(13);
const auth_service_1 = __webpack_require__(32);
const auth_controller_1 = __webpack_require__(36);
const jwt_strategy_1 = __webpack_require__(49);
const local_strategy_1 = __webpack_require__(51);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.User, entities_1.Role]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET', 'your-secret-key'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN', '24h'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const office_entity_1 = __webpack_require__(17);
const role_entity_1 = __webpack_require__(18);
const idea_entity_1 = __webpack_require__(19);
const comment_entity_1 = __webpack_require__(22);
const vote_entity_1 = __webpack_require__(23);
const review_entity_1 = __webpack_require__(24);
const project_entity_1 = __webpack_require__(25);
const progress_update_entity_1 = __webpack_require__(27);
const reward_entity_1 = __webpack_require__(30);
const nomination_entity_1 = __webpack_require__(29);
const audit_log_entity_1 = __webpack_require__(31);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.AccountStatus,
        default: enums_1.AccountStatus.ACTIVE,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.AccountStatus !== "undefined" && enums_1.AccountStatus) === "function" ? _a : Object)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "passwordResetExpires", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "totalPoints", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office, (office) => office.users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'officeId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof office_entity_1.Office !== "undefined" && office_entity_1.Office) === "function" ? _c : Object)
], User.prototype, "office", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.users, { eager: true }),
    (0, typeorm_1.JoinTable)({
        name: 'user_roles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => idea_entity_1.Idea, (idea) => idea.submittedBy),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "ideas", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.author),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.voter),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "votes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.reviewer),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => project_entity_1.Project, (project) => project.teamMembers),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "projects", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => progress_update_entity_1.ProgressUpdate, (update) => update.updatedBy),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "progressUpdates", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => reward_entity_1.Reward, (reward) => reward.recipient),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "rewards", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => nomination_entity_1.Nomination, (nomination) => nomination.nominatedUser),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "nominations", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => audit_log_entity_1.AuditLog, (audit) => audit.actor),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominationStatus = exports.RewardType = exports.MilestoneStatus = exports.ProjectStatus = exports.ReviewDecision = exports.IdeaStatus = exports.SystemRole = exports.AccountStatus = void 0;
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["INACTIVE"] = "inactive";
    AccountStatus["LOCKED"] = "locked";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var SystemRole;
(function (SystemRole) {
    SystemRole["USER"] = "user";
    SystemRole["KNOWLEDGE_CHAMPION"] = "knowledge_champion";
    SystemRole["INNOVATION_MANAGER"] = "innovation_manager";
    SystemRole["LOCAL_OFFICE_ADMIN"] = "local_office_admin";
    SystemRole["SYSTEM_ADMIN"] = "system_admin";
})(SystemRole || (exports.SystemRole = SystemRole = {}));
var IdeaStatus;
(function (IdeaStatus) {
    IdeaStatus["SUBMITTED"] = "submitted";
    IdeaStatus["UNDER_REVIEW"] = "under_review";
    IdeaStatus["APPROVED"] = "approved";
    IdeaStatus["DUPLICATE"] = "duplicate";
    IdeaStatus["REJECTED"] = "rejected";
    IdeaStatus["CHANGES_REQUESTED"] = "changes_requested";
})(IdeaStatus || (exports.IdeaStatus = IdeaStatus = {}));
var ReviewDecision;
(function (ReviewDecision) {
    ReviewDecision["APPROVED"] = "approved";
    ReviewDecision["REJECTED"] = "rejected";
    ReviewDecision["CHANGES_REQUESTED"] = "changes_requested";
})(ReviewDecision || (exports.ReviewDecision = ReviewDecision = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["COMPLETED"] = "completed";
    ProjectStatus["ARCHIVED"] = "archived";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var MilestoneStatus;
(function (MilestoneStatus) {
    MilestoneStatus["PENDING"] = "pending";
    MilestoneStatus["IN_PROGRESS"] = "in_progress";
    MilestoneStatus["COMPLETED"] = "completed";
})(MilestoneStatus || (exports.MilestoneStatus = MilestoneStatus = {}));
var RewardType;
(function (RewardType) {
    RewardType["BADGE"] = "badge";
    RewardType["CERTIFICATE"] = "certificate";
    RewardType["POINTS"] = "points";
})(RewardType || (exports.RewardType = RewardType = {}));
var NominationStatus;
(function (NominationStatus) {
    NominationStatus["PENDING"] = "pending";
    NominationStatus["APPROVED"] = "approved";
    NominationStatus["REJECTED"] = "rejected";
})(NominationStatus || (exports.NominationStatus = NominationStatus = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Office = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(14);
let Office = class Office {
};
exports.Office = Office;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Office.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Office.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Office.prototype, "region", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Office.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Office.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.office),
    tslib_1.__metadata("design:type", Array)
], Office.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Office.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Office.prototype, "updatedAt", void 0);
exports.Office = Office = tslib_1.__decorate([
    (0, typeorm_1.Entity)('offices')
], Office);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(14);
let Role = class Role {
};
exports.Role = Role;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.SystemRole,
        unique: true,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.SystemRole !== "undefined" && enums_1.SystemRole) === "function" ? _a : Object)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.roles),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Role.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Role.prototype, "updatedAt", void 0);
exports.Role = Role = tslib_1.__decorate([
    (0, typeorm_1.Entity)('roles')
], Role);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Idea = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(14);
const office_entity_1 = __webpack_require__(17);
const category_entity_1 = __webpack_require__(20);
const attachment_entity_1 = __webpack_require__(21);
const comment_entity_1 = __webpack_require__(22);
const vote_entity_1 = __webpack_require__(23);
const review_entity_1 = __webpack_require__(24);
const project_entity_1 = __webpack_require__(25);
let Idea = class Idea {
};
exports.Idea = Idea;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.IdeaStatus,
        default: enums_1.IdeaStatus.SUBMITTED,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.IdeaStatus !== "undefined" && enums_1.IdeaStatus) === "function" ? _a : Object)
], Idea.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Idea.prototype, "isOriginal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "duplicateOfId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Idea.prototype, "originalityScore", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Idea.prototype, "voteCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ideas),
    (0, typeorm_1.JoinColumn)({ name: 'submittedById' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Idea.prototype, "submittedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "submittedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'officeId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof office_entity_1.Office !== "undefined" && office_entity_1.Office) === "function" ? _c : Object)
], Idea.prototype, "office", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.ideas, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof category_entity_1.Category !== "undefined" && category_entity_1.Category) === "function" ? _d : Object)
], Idea.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Idea.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => attachment_entity_1.Attachment, (attachment) => attachment.idea, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "attachments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.idea, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => vote_entity_1.Vote, (vote) => vote.idea, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "votes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.idea, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.basedOnIdea),
    tslib_1.__metadata("design:type", Array)
], Idea.prototype, "projects", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Idea.prototype, "submissionDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Idea.prototype, "updatedAt", void 0);
exports.Idea = Idea = tslib_1.__decorate([
    (0, typeorm_1.Entity)('ideas')
], Idea);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const idea_entity_1 = __webpack_require__(19);
let Category = class Category {
};
exports.Category = Category;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => idea_entity_1.Idea, (idea) => idea.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "ideas", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Category.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Category.prototype, "updatedAt", void 0);
exports.Category = Category = tslib_1.__decorate([
    (0, typeorm_1.Entity)('categories')
], Category);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attachment = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const idea_entity_1 = __webpack_require__(19);
let Attachment = class Attachment {
};
exports.Attachment = Attachment;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "fileType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Attachment.prototype, "fileSize", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.Idea, (idea) => idea.attachments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ideaId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof idea_entity_1.Idea !== "undefined" && idea_entity_1.Idea) === "function" ? _a : Object)
], Attachment.prototype, "idea", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Attachment.prototype, "uploadedAt", void 0);
exports.Attachment = Attachment = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attachments')
], Attachment);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Comment = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const idea_entity_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(14);
let Comment = class Comment {
};
exports.Comment = Comment;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.Idea, (idea) => idea.comments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ideaId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof idea_entity_1.Idea !== "undefined" && idea_entity_1.Idea) === "function" ? _a : Object)
], Comment.prototype, "idea", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.comments),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Comment.prototype, "author", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Comment.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Comment.prototype, "updatedAt", void 0);
exports.Comment = Comment = tslib_1.__decorate([
    (0, typeorm_1.Entity)('comments')
], Comment);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vote = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const idea_entity_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(14);
let Vote = class Vote {
};
exports.Vote = Vote;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Vote.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.Idea, (idea) => idea.votes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ideaId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof idea_entity_1.Idea !== "undefined" && idea_entity_1.Idea) === "function" ? _a : Object)
], Vote.prototype, "idea", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Vote.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.votes),
    (0, typeorm_1.JoinColumn)({ name: 'voterId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Vote.prototype, "voter", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Vote.prototype, "voterId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Vote.prototype, "timestamp", void 0);
exports.Vote = Vote = tslib_1.__decorate([
    (0, typeorm_1.Entity)('votes'),
    (0, typeorm_1.Unique)(['ideaId', 'voterId'])
], Vote);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Review = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const idea_entity_1 = __webpack_require__(19);
const user_entity_1 = __webpack_require__(14);
let Review = class Review {
};
exports.Review = Review;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ReviewDecision,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ReviewDecision !== "undefined" && enums_1.ReviewDecision) === "function" ? _a : Object)
], Review.prototype, "decision", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.Idea, (idea) => idea.reviews, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ideaId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof idea_entity_1.Idea !== "undefined" && idea_entity_1.Idea) === "function" ? _b : Object)
], Review.prototype, "idea", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)({ name: 'reviewerId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Review.prototype, "reviewer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "reviewerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Review.prototype, "reviewDate", void 0);
exports.Review = Review = tslib_1.__decorate([
    (0, typeorm_1.Entity)('reviews')
], Review);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Project = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(14);
const idea_entity_1 = __webpack_require__(19);
const milestone_entity_1 = __webpack_require__(26);
const progress_update_entity_1 = __webpack_require__(27);
const evaluation_entity_1 = __webpack_require__(28);
const nomination_entity_1 = __webpack_require__(29);
let Project = class Project {
};
exports.Project = Project;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "objective", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ProjectStatus,
        default: enums_1.ProjectStatus.ACTIVE,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ProjectStatus !== "undefined" && enums_1.ProjectStatus) === "function" ? _a : Object)
], Project.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Project.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Project.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => idea_entity_1.Idea, (idea) => idea.projects),
    (0, typeorm_1.JoinColumn)({ name: 'basedOnIdeaId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof idea_entity_1.Idea !== "undefined" && idea_entity_1.Idea) === "function" ? _d : Object)
], Project.prototype, "basedOnIdea", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "basedOnIdeaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    tslib_1.__metadata("design:type", typeof (_e = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _e : Object)
], Project.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "createdById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.projects),
    (0, typeorm_1.JoinTable)({
        name: 'project_team_members',
        joinColumn: { name: 'projectId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Project.prototype, "teamMembers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => milestone_entity_1.Milestone, (milestone) => milestone.project, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Project.prototype, "milestones", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => progress_update_entity_1.ProgressUpdate, (update) => update.project, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Project.prototype, "progressUpdates", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => evaluation_entity_1.Evaluation, (evaluation) => evaluation.project),
    tslib_1.__metadata("design:type", Array)
], Project.prototype, "evaluations", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => nomination_entity_1.Nomination, (nomination) => nomination.project),
    tslib_1.__metadata("design:type", Array)
], Project.prototype, "nominations", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Project.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = tslib_1.__decorate([
    (0, typeorm_1.Entity)('projects')
], Project);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Milestone = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const project_entity_1 = __webpack_require__(25);
let Milestone = class Milestone {
};
exports.Milestone = Milestone;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Milestone.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Milestone.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Milestone.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Milestone.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MilestoneStatus,
        default: enums_1.MilestoneStatus.PENDING,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof enums_1.MilestoneStatus !== "undefined" && enums_1.MilestoneStatus) === "function" ? _b : Object)
], Milestone.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Milestone.prototype, "orderIndex", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.milestones, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _c : Object)
], Milestone.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Milestone.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Milestone.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Milestone.prototype, "updatedAt", void 0);
exports.Milestone = Milestone = tslib_1.__decorate([
    (0, typeorm_1.Entity)('milestones')
], Milestone);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgressUpdate = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const project_entity_1 = __webpack_require__(25);
const milestone_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(14);
let ProgressUpdate = class ProgressUpdate {
};
exports.ProgressUpdate = ProgressUpdate;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ProgressUpdate.prototype, "attachmentPaths", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.progressUpdates, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _a : Object)
], ProgressUpdate.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => milestone_entity_1.Milestone, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'milestoneId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof milestone_entity_1.Milestone !== "undefined" && milestone_entity_1.Milestone) === "function" ? _b : Object)
], ProgressUpdate.prototype, "milestone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "milestoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.progressUpdates),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], ProgressUpdate.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "updatedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ProgressUpdate.prototype, "isReviewed", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProgressUpdate.prototype, "reviewComments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProgressUpdate.prototype, "timestamp", void 0);
exports.ProgressUpdate = ProgressUpdate = tslib_1.__decorate([
    (0, typeorm_1.Entity)('progress_updates')
], ProgressUpdate);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Evaluation = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const project_entity_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(14);
let Evaluation = class Evaluation {
};
exports.Evaluation = Evaluation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Evaluation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], Evaluation.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Evaluation.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Evaluation.prototype, "impactScore", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Evaluation.prototype, "innovationScore", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Evaluation.prototype, "executionScore", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.evaluations),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _a : Object)
], Evaluation.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Evaluation.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'evaluatedById' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Evaluation.prototype, "evaluatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Evaluation.prototype, "evaluatedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Evaluation.prototype, "evaluationDate", void 0);
exports.Evaluation = Evaluation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('evaluations')
], Evaluation);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nomination = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const project_entity_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(14);
let Nomination = class Nomination {
};
exports.Nomination = Nomination;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Nomination.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], Nomination.prototype, "justification", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.NominationStatus,
        default: enums_1.NominationStatus.PENDING,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.NominationStatus !== "undefined" && enums_1.NominationStatus) === "function" ? _a : Object)
], Nomination.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.nominations),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _b : Object)
], Nomination.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Nomination.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.nominations),
    (0, typeorm_1.JoinColumn)({ name: 'nominatedUserId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Nomination.prototype, "nominatedUser", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Nomination.prototype, "nominatedUserId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'nominatedById' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _d : Object)
], Nomination.prototype, "nominatedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Nomination.prototype, "nominatedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Nomination.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Nomination.prototype, "updatedAt", void 0);
exports.Nomination = Nomination = tslib_1.__decorate([
    (0, typeorm_1.Entity)('nominations')
], Nomination);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reward = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(14);
const project_entity_1 = __webpack_require__(25);
let Reward = class Reward {
};
exports.Reward = Reward;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.RewardType,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.RewardType !== "undefined" && enums_1.RewardType) === "function" ? _a : Object)
], Reward.prototype, "rewardType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Reward.prototype, "points", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "badgeName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "certificateTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.rewards),
    (0, typeorm_1.JoinColumn)({ name: 'recipientId' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Reward.prototype, "recipient", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "recipientId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'awardedById' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Reward.prototype, "awardedBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "awardedById", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof project_entity_1.Project !== "undefined" && project_entity_1.Project) === "function" ? _d : Object)
], Reward.prototype, "project", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Reward.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Reward.prototype, "awardedAt", void 0);
exports.Reward = Reward = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rewards')
], Reward);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLog = void 0;
const tslib_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(14);
let AuditLog = class AuditLog {
};
exports.AuditLog = AuditLog;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "entityType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], AuditLog.prototype, "previousValues", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], AuditLog.prototype, "newValues", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "userAgent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.auditLogs),
    (0, typeorm_1.JoinColumn)({ name: 'actorId' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], AuditLog.prototype, "actor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AuditLog.prototype, "timestamp", void 0);
exports.AuditLog = AuditLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('audit_logs')
], AuditLog);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const bcrypt = tslib_1.__importStar(__webpack_require__(33));
const uuid_1 = __webpack_require__(34);
const entities_1 = __webpack_require__(13);
const enums_1 = __webpack_require__(16);
const audit_service_1 = __webpack_require__(35);
let AuthService = class AuthService {
    constructor(userRepository, roleRepository, jwtService, auditService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.auditService = auditService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['roles', 'office'],
        });
        if (!user) {
            return null;
        }
        if (user.status === enums_1.AccountStatus.LOCKED) {
            throw new common_1.UnauthorizedException('Account is locked');
        }
        if (user.status === enums_1.AccountStatus.INACTIVE) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    async login(user) {
        const payload = { sub: user.id, email: user.email };
        await this.auditService.log({
            action: 'LOGIN',
            entityType: 'User',
            entityId: user.id,
            actorId: user.id,
        });
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
                office: user.office,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const defaultRole = await this.roleRepository.findOne({
            where: { name: enums_1.SystemRole.USER },
        });
        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            officeId: registerDto.officeId,
            roles: defaultRole ? [defaultRole] : [],
            status: enums_1.AccountStatus.ACTIVE,
        });
        const savedUser = await this.userRepository.save(user);
        await this.auditService.log({
            action: 'REGISTER',
            entityType: 'User',
            entityId: savedUser.id,
            actorId: savedUser.id,
            newValues: { name: savedUser.name, email: savedUser.email },
        });
        const payload = { sub: savedUser.id, email: savedUser.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
            },
        };
    }
    async requestPasswordReset(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
        });
        if (!user) {
            return { message: 'If the email exists, a reset link has been sent' };
        }
        const resetToken = (0, uuid_1.v4)();
        const resetExpires = new Date();
        resetExpires.setHours(resetExpires.getHours() + 1);
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpires;
        await this.userRepository.save(user);
        await this.auditService.log({
            action: 'PASSWORD_RESET_REQUESTED',
            entityType: 'User',
            entityId: user.id,
            actorId: user.id,
        });
        return { message: 'If the email exists, a reset link has been sent', token: resetToken };
    }
    async resetPassword(dto) {
        const user = await this.userRepository.findOne({
            where: {
                passwordResetToken: dto.token,
                passwordResetExpires: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await this.userRepository.save(user);
        await this.auditService.log({
            action: 'PASSWORD_RESET_COMPLETED',
            entityType: 'User',
            entityId: user.id,
            actorId: user.id,
        });
        return { message: 'Password has been reset successfully' };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'office'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            totalPoints: user.totalPoints,
            roles: user.roles,
            office: user.office,
            createdAt: user.createdAt,
        };
    }
    async updateProfile(userId, dto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'office'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const previousValues = { name: user.name, officeId: user.officeId };
        if (dto.name) {
            user.name = dto.name;
        }
        if (dto.officeId !== undefined) {
            user.officeId = dto.officeId;
        }
        await this.userRepository.save(user);
        const updatedUser = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'office'],
        });
        await this.auditService.log({
            action: 'UPDATE_PROFILE',
            entityType: 'User',
            entityId: user.id,
            actorId: user.id,
            previousValues,
            newValues: { name: updatedUser?.name, officeId: updatedUser?.officeId },
        });
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            status: updatedUser.status,
            totalPoints: updatedUser.totalPoints,
            roles: updatedUser.roles,
            office: updatedUser.office,
            createdAt: updatedUser.createdAt,
        };
    }
    async changePassword(userId, dto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        await this.auditService.log({
            action: 'CHANGE_PASSWORD',
            entityType: 'User',
            entityId: user.id,
            actorId: user.id,
        });
        return { message: 'Password changed successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object, typeof (_d = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _d : Object])
], AuthService);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
let AuditService = class AuditService {
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async log(params) {
        const auditLog = this.auditLogRepository.create({
            action: params.action,
            entityType: params.entityType,
            entityId: params.entityId,
            actorId: params.actorId,
            previousValues: params.previousValues,
            newValues: params.newValues,
            ipAddress: params.ipAddress,
            userAgent: params.userAgent,
        });
        return this.auditLogRepository.save(auditLog);
    }
    async findAll(params) {
        const { page = 1, limit = 20, entityType, action, actorId, search, startDate, endDate } = params;
        const queryBuilder = this.auditLogRepository
            .createQueryBuilder('audit')
            .leftJoinAndSelect('audit.actor', 'actor')
            .orderBy('audit.timestamp', 'DESC');
        if (entityType) {
            queryBuilder.andWhere('audit.entityType = :entityType', { entityType });
        }
        if (action) {
            queryBuilder.andWhere('audit.action ILIKE :action', { action: `%${action}%` });
        }
        if (actorId) {
            queryBuilder.andWhere('audit.actorId = :actorId', { actorId });
        }
        if (search) {
            queryBuilder.andWhere('(actor.name ILIKE :search OR actor.email ILIKE :search OR audit.entityType ILIKE :search OR audit.action ILIKE :search OR CAST(audit.entityId AS TEXT) ILIKE :search)', { search: `%${search}%` });
        }
        if (startDate && endDate) {
            queryBuilder.andWhere('audit.timestamp BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }
        const [items, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findByEntityId(entityType, entityId) {
        return this.auditLogRepository.find({
            where: { entityType, entityId },
            relations: ['actor'],
            order: { timestamp: 'DESC' },
        });
    }
    async findByActor(actorId, limit = 50) {
        return this.auditLogRepository.find({
            where: { actorId },
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.AuditLog)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AuditService);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(12);
const swagger_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(32);
const dto_1 = __webpack_require__(37);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const entities_1 = __webpack_require__(13);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, _loginDto) {
        return this.authService.login(req.user);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async requestPasswordReset(dto) {
        return this.authService.requestPasswordReset(dto);
    }
    async resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    async getProfile(user) {
        return this.authService.getProfile(user.id);
    }
    async updateProfile(user, dto) {
        return this.authService.updateProfile(user.id, dto);
    }
    async changePassword(user, dto) {
        return this.authService.changePassword(user.id, dto);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof dto_1.LoginDto !== "undefined" && dto_1.LoginDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email already registered' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.RegisterDto !== "undefined" && dto_1.RegisterDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('password-reset/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reset link sent if email exists' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.RequestPasswordResetDto !== "undefined" && dto_1.RequestPasswordResetDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
tslib_1.__decorate([
    (0, common_1.Post)('password-reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successful' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired token' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.ResetPasswordDto !== "undefined" && dto_1.ResetPasswordDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    tslib_1.__param(0, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    tslib_1.__param(0, (0, decorators_1.CurrentUser)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object, typeof (_h = typeof dto_1.UpdateProfileDto !== "undefined" && dto_1.UpdateProfileDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
tslib_1.__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Change current user password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password changed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Current password is incorrect' }),
    tslib_1.__param(0, (0, decorators_1.CurrentUser)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object, typeof (_k = typeof dto_1.ChangePasswordDto !== "undefined" && dto_1.ChangePasswordDto) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], RegisterDto.prototype, "officeId", void 0);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = exports.RequestPasswordResetDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class RequestPasswordResetDto {
}
exports.RequestPasswordResetDto = RequestPasswordResetDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RequestPasswordResetDto.prototype, "email", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'newpassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = exports.UpdateProfileDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('all'),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "officeId", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    tslib_1.__metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(12);
const core_1 = __webpack_require__(2);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const roles_decorator_1 = __webpack_require__(46);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.roles) {
            return false;
        }
        return requiredRoles.some((role) => user.roles.some((userRole) => userRole.name === role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(1);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(12);
const passport_jwt_1 = __webpack_require__(50);
const config_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const enums_1 = __webpack_require__(16);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET', 'your-secret-key'),
        });
        this.userRepository = userRepository;
    }
    async validate(payload) {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
            relations: ['roles', 'office'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user.status !== enums_1.AccountStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is not active');
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(12);
const passport_local_1 = __webpack_require__(52);
const auth_service_1 = __webpack_require__(32);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const users_service_1 = __webpack_require__(54);
const users_controller_1 = __webpack_require__(55);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.User, entities_1.Role, entities_1.Office])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const bcrypt = tslib_1.__importStar(__webpack_require__(33));
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const enums_1 = __webpack_require__(16);
let UsersService = class UsersService {
    constructor(userRepository, roleRepository, officeRepository, auditService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.officeRepository = officeRepository;
        this.auditService = auditService;
    }
    async create(createUserDto, actorId) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered');
        }
        if (createUserDto.officeId) {
            const office = await this.officeRepository.findOne({
                where: { id: createUserDto.officeId },
            });
            if (!office) {
                throw new common_1.NotFoundException('Office not found');
            }
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        let roles = [];
        if (createUserDto.roleIds?.length) {
            roles = await this.roleRepository.find({
                where: { id: (0, typeorm_2.In)(createUserDto.roleIds) },
            });
        }
        else {
            const defaultRole = await this.roleRepository.findOne({
                where: { name: enums_1.SystemRole.USER },
            });
            if (defaultRole) {
                roles = [defaultRole];
            }
        }
        const user = this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
            officeId: createUserDto.officeId,
            roles,
            status: enums_1.AccountStatus.ACTIVE,
        });
        const savedUser = await this.userRepository.save(user);
        await this.auditService.log({
            action: 'CREATE_USER',
            entityType: 'User',
            entityId: savedUser.id,
            actorId,
            newValues: { name: savedUser.name, email: savedUser.email },
        });
        return this.sanitizeUser(savedUser);
    }
    async findAll(searchDto) {
        const { name, email, officeId, roleId, status, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'role')
            .leftJoinAndSelect('user.office', 'office');
        if (name) {
            queryBuilder.andWhere('user.name ILIKE :name', { name: `%${name}%` });
        }
        if (email) {
            queryBuilder.andWhere('user.email ILIKE :email', { email: `%${email}%` });
        }
        if (officeId) {
            queryBuilder.andWhere('user.officeId = :officeId', { officeId });
        }
        if (roleId) {
            queryBuilder.andWhere('role.id = :roleId', { roleId });
        }
        if (status) {
            queryBuilder.andWhere('user.status = :status', { status });
        }
        const [users, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: users.map((u) => this.sanitizeUser(u)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['roles', 'office'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.sanitizeUser(user);
    }
    async update(id, updateUserDto, actorId) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['roles', 'office'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const previousValues = {
            name: user.name,
            email: user.email,
            status: user.status,
            officeId: user.officeId,
        };
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        if (updateUserDto.officeId) {
            const office = await this.officeRepository.findOne({
                where: { id: updateUserDto.officeId },
            });
            if (!office) {
                throw new common_1.NotFoundException('Office not found');
            }
        }
        Object.assign(user, updateUserDto);
        const savedUser = await this.userRepository.save(user);
        await this.auditService.log({
            action: 'UPDATE_USER',
            entityType: 'User',
            entityId: savedUser.id,
            actorId,
            previousValues,
            newValues: updateUserDto,
        });
        return this.sanitizeUser(savedUser);
    }
    async assignRoles(id, assignRolesDto, actorId) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const previousRoles = user.roles.map((r) => r.id);
        const roles = await this.roleRepository.find({
            where: { id: (0, typeorm_2.In)(assignRolesDto.roleIds) },
        });
        user.roles = roles;
        const savedUser = await this.userRepository.save(user);
        await this.auditService.log({
            action: 'ASSIGN_ROLES',
            entityType: 'User',
            entityId: savedUser.id,
            actorId,
            previousValues: { roleIds: previousRoles },
            newValues: { roleIds: assignRolesDto.roleIds },
        });
        return this.sanitizeUser(savedUser);
    }
    async deactivate(id, actorId) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.status = enums_1.AccountStatus.INACTIVE;
        await this.userRepository.save(user);
        await this.auditService.log({
            action: 'DEACTIVATE_USER',
            entityType: 'User',
            entityId: user.id,
            actorId,
        });
        return { message: 'User deactivated successfully' };
    }
    async activate(id, actorId) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.status = enums_1.AccountStatus.ACTIVE;
        await this.userRepository.save(user);
        await this.auditService.log({
            action: 'ACTIVATE_USER',
            entityType: 'User',
            entityId: user.id,
            actorId,
        });
        return { message: 'User activated successfully' };
    }
    async getAllRoles() {
        return this.roleRepository.find();
    }
    sanitizeUser(user) {
        const { password, passwordResetToken, passwordResetExpires, ...result } = user;
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(entities_1.Office)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _d : Object])
], UsersService);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(54);
const dto_1 = __webpack_require__(56);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, user) {
        return this.usersService.create(createUserDto, user.id);
    }
    findAll(searchDto) {
        return this.usersService.findAll(searchDto);
    }
    getAllRoles() {
        return this.usersService.getAllRoles();
    }
    searchUsers(searchDto) {
        return this.usersService.findAll({ ...searchDto, status: 'active' });
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto, user) {
        return this.usersService.update(id, updateUserDto, user.id);
    }
    assignRoles(id, assignRolesDto, user) {
        return this.usersService.assignRoles(id, assignRolesDto, user.id);
    }
    deactivate(id, user) {
        return this.usersService.deactivate(id, user.id);
    }
    activate(id, user) {
        return this.usersService.activate(id, user.id);
    }
};
exports.UsersController = UsersController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.SearchUsersDto !== "undefined" && dto_1.SearchUsersDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('roles'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Roles retrieved successfully' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "getAllRoles", null);
tslib_1.__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search users by name (for dropdowns)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.SearchUsersDto !== "undefined" && dto_1.SearchUsersDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "searchUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update user (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _f : Object, typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/roles'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Assign roles to user (system admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Roles assigned successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_h = typeof dto_1.AssignRolesDto !== "undefined" && dto_1.AssignRolesDto) === "function" ? _h : Object, typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "assignRoles", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate user (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deactivated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_k = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "deactivate", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Activate user (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User activated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_l = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "activate", null);
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateUserDto.prototype, "roleIds", void 0);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignRolesDto = exports.UpdateUserDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'user@example.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.AccountStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.AccountStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.AccountStatus !== "undefined" && enums_1.AccountStatus) === "function" ? _a : Object)
], UpdateUserDto.prototype, "status", void 0);
class AssignRolesDto {
}
exports.AssignRolesDto = AssignRolesDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    tslib_1.__metadata("design:type", Array)
], AssignRolesDto.prototype, "roleIds", void 0);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchUsersDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
const enums_1 = __webpack_require__(16);
class SearchUsersDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchUsersDto = SearchUsersDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchUsersDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchUsersDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchUsersDto.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchUsersDto.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.AccountStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.AccountStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.AccountStatus !== "undefined" && enums_1.AccountStatus) === "function" ? _a : Object)
], SearchUsersDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchUsersDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchUsersDto.prototype, "limit", void 0);


/***/ }),
/* 60 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignRolesDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class AssignRolesDto {
}
exports.AssignRolesDto = AssignRolesDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    tslib_1.__metadata("design:type", Array)
], AssignRolesDto.prototype, "roleIds", void 0);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficesModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const offices_service_1 = __webpack_require__(63);
const offices_controller_1 = __webpack_require__(64);
let OfficesModule = class OfficesModule {
};
exports.OfficesModule = OfficesModule;
exports.OfficesModule = OfficesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Office])],
        controllers: [offices_controller_1.OfficesController],
        providers: [offices_service_1.OfficesService],
        exports: [offices_service_1.OfficesService],
    })
], OfficesModule);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficesService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
let OfficesService = class OfficesService {
    constructor(officeRepository, auditService) {
        this.officeRepository = officeRepository;
        this.auditService = auditService;
    }
    async create(createOfficeDto, actorId) {
        const existing = await this.officeRepository.findOne({
            where: { name: createOfficeDto.name },
        });
        if (existing) {
            throw new common_1.BadRequestException('Office with this name already exists');
        }
        const office = this.officeRepository.create(createOfficeDto);
        const savedOffice = await this.officeRepository.save(office);
        await this.auditService.log({
            action: 'CREATE_OFFICE',
            entityType: 'Office',
            entityId: savedOffice.id,
            actorId,
            newValues: createOfficeDto,
        });
        return savedOffice;
    }
    async findAll(searchDto) {
        const { name, region, isActive, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.officeRepository
            .createQueryBuilder('office')
            .loadRelationCountAndMap('office.userCount', 'office.users');
        if (name) {
            queryBuilder.andWhere('office.name ILIKE :name', { name: `%${name}%` });
        }
        if (region) {
            queryBuilder.andWhere('office.region ILIKE :region', { region: `%${region}%` });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('office.isActive = :isActive', { isActive });
        }
        const [offices, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: offices,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const office = await this.officeRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!office) {
            throw new common_1.NotFoundException('Office not found');
        }
        return office;
    }
    async update(id, updateOfficeDto, actorId) {
        const office = await this.officeRepository.findOne({ where: { id } });
        if (!office) {
            throw new common_1.NotFoundException('Office not found');
        }
        const previousValues = {
            name: office.name,
            region: office.region,
            address: office.address,
            isActive: office.isActive,
        };
        if (updateOfficeDto.name && updateOfficeDto.name !== office.name) {
            const existing = await this.officeRepository.findOne({
                where: { name: updateOfficeDto.name },
            });
            if (existing) {
                throw new common_1.BadRequestException('Office with this name already exists');
            }
        }
        Object.assign(office, updateOfficeDto);
        const savedOffice = await this.officeRepository.save(office);
        await this.auditService.log({
            action: 'UPDATE_OFFICE',
            entityType: 'Office',
            entityId: savedOffice.id,
            actorId,
            previousValues,
            newValues: updateOfficeDto,
        });
        return savedOffice;
    }
    async remove(id, actorId) {
        const office = await this.officeRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!office) {
            throw new common_1.NotFoundException('Office not found');
        }
        if (office.users?.length > 0) {
            throw new common_1.BadRequestException('Cannot delete office with assigned users');
        }
        await this.officeRepository.remove(office);
        await this.auditService.log({
            action: 'DELETE_OFFICE',
            entityType: 'Office',
            entityId: id,
            actorId,
            previousValues: { name: office.name },
        });
        return { message: 'Office deleted successfully' };
    }
};
exports.OfficesService = OfficesService;
exports.OfficesService = OfficesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.Office)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _b : Object])
], OfficesService);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfficesController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const offices_service_1 = __webpack_require__(63);
const dto_1 = __webpack_require__(65);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let OfficesController = class OfficesController {
    constructor(officesService) {
        this.officesService = officesService;
    }
    create(createOfficeDto, user) {
        return this.officesService.create(createOfficeDto, user.id);
    }
    findAll(searchDto) {
        return this.officesService.findAll(searchDto);
    }
    findOne(id) {
        return this.officesService.findOne(id);
    }
    update(id, updateOfficeDto, user) {
        return this.officesService.update(id, updateOfficeDto, user.id);
    }
    remove(id, user) {
        return this.officesService.remove(id, user.id);
    }
};
exports.OfficesController = OfficesController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new office (system admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Office created successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateOfficeDto !== "undefined" && dto_1.CreateOfficeDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], OfficesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list offices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Offices retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.SearchOfficesDto !== "undefined" && dto_1.SearchOfficesDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], OfficesController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get office by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Office retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Office not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], OfficesController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update office (system admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Office updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Office not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof dto_1.UpdateOfficeDto !== "undefined" && dto_1.UpdateOfficeDto) === "function" ? _e : Object, typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], OfficesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete office (system admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Office deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Office not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], OfficesController.prototype, "remove", null);
exports.OfficesController = OfficesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('offices'),
    (0, common_1.Controller)('offices'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof offices_service_1.OfficesService !== "undefined" && offices_service_1.OfficesService) === "function" ? _a : Object])
], OfficesController);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOfficeDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateOfficeDto {
}
exports.CreateOfficeDto = CreateOfficeDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOfficeDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOfficeDto.prototype, "region", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateOfficeDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateOfficeDto.prototype, "isActive", void 0);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOfficeDto = void 0;
const swagger_1 = __webpack_require__(3);
const create_office_dto_1 = __webpack_require__(66);
class UpdateOfficeDto extends (0, swagger_1.PartialType)(create_office_dto_1.CreateOfficeDto) {
}
exports.UpdateOfficeDto = UpdateOfficeDto;


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchOfficesDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
class SearchOfficesDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchOfficesDto = SearchOfficesDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchOfficesDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchOfficesDto.prototype, "region", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], SearchOfficesDto.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchOfficesDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchOfficesDto.prototype, "limit", void 0);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const ideas_service_1 = __webpack_require__(70);
const ideas_controller_1 = __webpack_require__(71);
let IdeasModule = class IdeasModule {
};
exports.IdeasModule = IdeasModule;
exports.IdeasModule = IdeasModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Idea, entities_1.Comment, entities_1.Vote, entities_1.Category, entities_1.Attachment])],
        controllers: [ideas_controller_1.IdeasController],
        providers: [ideas_service_1.IdeasService],
        exports: [ideas_service_1.IdeasService],
    })
], IdeasModule);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const enums_1 = __webpack_require__(16);
let IdeasService = class IdeasService {
    constructor(ideaRepository, commentRepository, voteRepository, categoryRepository, attachmentRepository, auditService) {
        this.ideaRepository = ideaRepository;
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
        this.categoryRepository = categoryRepository;
        this.attachmentRepository = attachmentRepository;
        this.auditService = auditService;
    }
    async create(createIdeaDto, user) {
        if (createIdeaDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: createIdeaDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
        }
        const { originalityScore, duplicateOfId } = await this.checkOriginality(createIdeaDto.title, createIdeaDto.description);
        const idea = this.ideaRepository.create({
            title: createIdeaDto.title,
            description: createIdeaDto.description,
            categoryId: createIdeaDto.categoryId,
            officeId: createIdeaDto.officeId || user.officeId,
            submittedById: user.id,
            status: enums_1.IdeaStatus.SUBMITTED,
            isOriginal: originalityScore >= 0.7,
            originalityScore,
            duplicateOfId,
        });
        const savedIdea = await this.ideaRepository.save(idea);
        if (createIdeaDto.attachmentUrls?.length) {
            const attachments = createIdeaDto.attachmentUrls.map((url) => this.attachmentRepository.create({ url, ideaId: savedIdea.id }));
            await this.attachmentRepository.save(attachments);
        }
        await this.auditService.log({
            action: 'CREATE_IDEA',
            entityType: 'Idea',
            entityId: savedIdea.id,
            actorId: user.id,
            newValues: { title: savedIdea.title, status: savedIdea.status },
        });
        return this.findOne(savedIdea.id);
    }
    async findAll(searchDto) {
        const { title, keyword, categoryId, officeId, submittedById, status, isOriginal, page = 1, limit = 20, sortBy = 'submissionDate', sortOrder = 'DESC', } = searchDto;
        const queryBuilder = this.ideaRepository
            .createQueryBuilder('idea')
            .leftJoinAndSelect('idea.submittedBy', 'submittedBy')
            .leftJoinAndSelect('idea.category', 'category')
            .leftJoinAndSelect('idea.office', 'office');
        if (title) {
            queryBuilder.andWhere('idea.title ILIKE :title', { title: `%${title}%` });
        }
        if (keyword) {
            queryBuilder.andWhere('(idea.title ILIKE :keyword OR idea.description ILIKE :keyword)', { keyword: `%${keyword}%` });
        }
        if (categoryId) {
            queryBuilder.andWhere('idea.categoryId = :categoryId', { categoryId });
        }
        if (officeId) {
            queryBuilder.andWhere('idea.officeId = :officeId', { officeId });
        }
        if (submittedById) {
            queryBuilder.andWhere('idea.submittedById = :submittedById', { submittedById });
        }
        if (status) {
            queryBuilder.andWhere('idea.status = :status', { status });
        }
        if (isOriginal !== undefined) {
            queryBuilder.andWhere('idea.isOriginal = :isOriginal', { isOriginal });
        }
        queryBuilder.orderBy(`idea.${sortBy}`, sortOrder);
        const [ideas, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: ideas,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['submittedBy', 'category', 'office', 'attachments', 'comments', 'comments.author', 'votes'],
        });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        return idea;
    }
    async update(id, updateIdeaDto, user) {
        const idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['submittedBy'],
        });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        const isOwner = idea.submittedById === user.id;
        const isAdmin = user.roles?.some((r) => [enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.LOCAL_OFFICE_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER].includes(r.name));
        if (!isOwner && !isAdmin) {
            throw new common_1.ForbiddenException('Not authorized to update this idea');
        }
        if (isOwner && !isAdmin && idea.status !== enums_1.IdeaStatus.SUBMITTED && idea.status !== enums_1.IdeaStatus.CHANGES_REQUESTED) {
            throw new common_1.BadRequestException('Can only edit ideas in SUBMITTED or CHANGES_REQUESTED status');
        }
        const previousValues = {
            title: idea.title,
            description: idea.description,
            status: idea.status,
        };
        if (updateIdeaDto.title || updateIdeaDto.description) {
            const { originalityScore, duplicateOfId } = await this.checkOriginality(updateIdeaDto.title || idea.title, updateIdeaDto.description || idea.description, idea.id);
            idea.originalityScore = originalityScore;
            idea.isOriginal = originalityScore >= 0.7;
            idea.duplicateOfId = duplicateOfId;
        }
        Object.assign(idea, updateIdeaDto);
        const savedIdea = await this.ideaRepository.save(idea);
        await this.auditService.log({
            action: 'UPDATE_IDEA',
            entityType: 'Idea',
            entityId: savedIdea.id,
            actorId: user.id,
            previousValues,
            newValues: updateIdeaDto,
        });
        return this.findOne(savedIdea.id);
    }
    async addComment(ideaId, createCommentDto, user) {
        const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        const comment = this.commentRepository.create({
            content: createCommentDto.content,
            ideaId,
            authorId: user.id,
        });
        const savedComment = await this.commentRepository.save(comment);
        await this.auditService.log({
            action: 'ADD_COMMENT',
            entityType: 'Comment',
            entityId: savedComment.id,
            actorId: user.id,
            newValues: { ideaId, content: createCommentDto.content },
        });
        return this.commentRepository.findOne({
            where: { id: savedComment.id },
            relations: ['author'],
        });
    }
    async deleteComment(ideaId, commentId, user) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, ideaId },
            relations: ['author'],
        });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        const isOwner = comment.authorId === user.id;
        const isModerator = user.roles?.some((r) => [enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.KNOWLEDGE_CHAMPION, enums_1.SystemRole.INNOVATION_MANAGER].includes(r.name));
        if (!isOwner && !isModerator) {
            throw new common_1.ForbiddenException('Not authorized to delete this comment');
        }
        await this.commentRepository.remove(comment);
        await this.auditService.log({
            action: 'DELETE_COMMENT',
            entityType: 'Comment',
            entityId: commentId,
            actorId: user.id,
            previousValues: { content: comment.content },
        });
        return { message: 'Comment deleted successfully' };
    }
    async vote(ideaId, user) {
        const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        if (idea.submittedById === user.id) {
            throw new common_1.BadRequestException('Cannot vote on your own idea');
        }
        const existingVote = await this.voteRepository.findOne({
            where: { ideaId, voterId: user.id },
        });
        if (existingVote) {
            throw new common_1.BadRequestException('Already voted on this idea');
        }
        const vote = this.voteRepository.create({
            ideaId,
            voterId: user.id,
        });
        await this.voteRepository.save(vote);
        idea.voteCount += 1;
        await this.ideaRepository.save(idea);
        await this.auditService.log({
            action: 'VOTE_IDEA',
            entityType: 'Vote',
            entityId: vote.id,
            actorId: user.id,
            newValues: { ideaId },
        });
        return { message: 'Vote recorded successfully', voteCount: idea.voteCount };
    }
    async unvote(ideaId, user) {
        const vote = await this.voteRepository.findOne({
            where: { ideaId, voterId: user.id },
        });
        if (!vote) {
            throw new common_1.NotFoundException('Vote not found');
        }
        await this.voteRepository.remove(vote);
        const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
        if (idea) {
            idea.voteCount = Math.max(0, idea.voteCount - 1);
            await this.ideaRepository.save(idea);
        }
        await this.auditService.log({
            action: 'UNVOTE_IDEA',
            entityType: 'Vote',
            entityId: vote.id,
            actorId: user.id,
            previousValues: { ideaId },
        });
        return { message: 'Vote removed successfully', voteCount: idea?.voteCount || 0 };
    }
    async getMyIdeas(user, searchDto) {
        return this.findAll({ ...searchDto, submittedById: user.id });
    }
    async getIdeasForReview(searchDto) {
        return this.findAll({ ...searchDto, status: enums_1.IdeaStatus.SUBMITTED });
    }
    async getCategories() {
        return this.categoryRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
    async checkOriginality(title, description, excludeId) {
        const queryBuilder = this.ideaRepository
            .createQueryBuilder('idea')
            .where('idea.title ILIKE :title', { title: `%${title.substring(0, 50)}%` });
        if (excludeId) {
            queryBuilder.andWhere('idea.id != :excludeId', { excludeId });
        }
        const similar = await queryBuilder.getMany();
        if (similar.length === 0) {
            return { originalityScore: 1.0, duplicateOfId: null };
        }
        const titleLower = title.toLowerCase();
        for (const existing of similar) {
            const existingTitleLower = existing.title.toLowerCase();
            if (titleLower === existingTitleLower) {
                return { originalityScore: 0, duplicateOfId: existing.id };
            }
            const similarity = this.calculateSimilarity(titleLower, existingTitleLower);
            if (similarity > 0.8) {
                return { originalityScore: 1 - similarity, duplicateOfId: existing.id };
            }
        }
        return { originalityScore: 0.85, duplicateOfId: null };
    }
    calculateSimilarity(str1, str2) {
        const words1 = new Set(str1.split(/\s+/));
        const words2 = new Set(str2.split(/\s+/));
        const intersection = new Set([...words1].filter((x) => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        return intersection.size / union.size;
    }
};
exports.IdeasService = IdeasService;
exports.IdeasService = IdeasService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.Idea)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Comment)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(entities_1.Vote)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(entities_1.Category)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(entities_1.Attachment)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _f : Object])
], IdeasService);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdeasController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const ideas_service_1 = __webpack_require__(70);
const dto_1 = __webpack_require__(72);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let IdeasController = class IdeasController {
    constructor(ideasService) {
        this.ideasService = ideasService;
    }
    create(createIdeaDto, user) {
        return this.ideasService.create(createIdeaDto, user);
    }
    getCategories() {
        return this.ideasService.getCategories();
    }
    findAll(searchDto) {
        return this.ideasService.findAll(searchDto);
    }
    getMyIdeas(searchDto, user) {
        return this.ideasService.getMyIdeas(user, searchDto);
    }
    getIdeasForReview(searchDto) {
        return this.ideasService.getIdeasForReview(searchDto);
    }
    findOne(id) {
        return this.ideasService.findOne(id);
    }
    update(id, updateIdeaDto, user) {
        return this.ideasService.update(id, updateIdeaDto, user);
    }
    addComment(id, createCommentDto, user) {
        return this.ideasService.addComment(id, createCommentDto, user);
    }
    deleteComment(id, commentId, user) {
        return this.ideasService.deleteComment(id, commentId, user);
    }
    vote(id, user) {
        return this.ideasService.vote(id, user);
    }
    unvote(id, user) {
        return this.ideasService.unvote(id, user);
    }
};
exports.IdeasController = IdeasController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new idea' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Idea submitted successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateIdeaDto !== "undefined" && dto_1.CreateIdeaDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active categories' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "getCategories", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list ideas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ideas retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.SearchIdeasDto !== "undefined" && dto_1.SearchIdeasDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-ideas'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user ideas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ideas retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.SearchIdeasDto !== "undefined" && dto_1.SearchIdeasDto) === "function" ? _e : Object, typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "getMyIdeas", null);
tslib_1.__decorate([
    (0, common_1.Get)('for-review'),
    (0, decorators_1.Roles)(enums_1.SystemRole.KNOWLEDGE_CHAMPION, enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get ideas pending review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ideas retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof dto_1.SearchIdeasDto !== "undefined" && dto_1.SearchIdeasDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "getIdeasForReview", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get idea by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Idea retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Idea not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update idea' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Idea updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Idea not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_h = typeof dto_1.UpdateIdeaDto !== "undefined" && dto_1.UpdateIdeaDto) === "function" ? _h : Object, typeof (_j = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add comment to idea' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Idea not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_k = typeof dto_1.CreateCommentDto !== "undefined" && dto_1.CreateCommentDto) === "function" ? _k : Object, typeof (_l = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "addComment", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id/comments/:commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete comment from idea' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Param)('commentId', common_1.ParseUUIDPipe)),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_m = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "deleteComment", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/vote'),
    (0, swagger_1.ApiOperation)({ summary: 'Vote for an idea' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vote recorded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Idea not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already voted or voting on own idea' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_o = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "vote", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id/vote'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove vote from idea' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vote removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vote not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_p = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IdeasController.prototype, "unvote", null);
exports.IdeasController = IdeasController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('ideas'),
    (0, common_1.Controller)('ideas'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ideas_service_1.IdeasService !== "undefined" && ideas_service_1.IdeasService) === "function" ? _a : Object])
], IdeasController);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateIdeaDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateIdeaDto {
}
exports.CreateIdeaDto = CreateIdeaDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    tslib_1.__metadata("design:type", String)
], CreateIdeaDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    tslib_1.__metadata("design:type", String)
], CreateIdeaDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateIdeaDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateIdeaDto.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateIdeaDto.prototype, "attachmentUrls", void 0);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateIdeaDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class UpdateIdeaDto {
}
exports.UpdateIdeaDto = UpdateIdeaDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    tslib_1.__metadata("design:type", String)
], UpdateIdeaDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    tslib_1.__metadata("design:type", String)
], UpdateIdeaDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], UpdateIdeaDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.IdeaStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.IdeaStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.IdeaStatus !== "undefined" && enums_1.IdeaStatus) === "function" ? _a : Object)
], UpdateIdeaDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateIdeaDto.prototype, "attachmentUrls", void 0);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchIdeasDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
const enums_1 = __webpack_require__(16);
class SearchIdeasDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
        this.sortBy = 'submissionDate';
        this.sortOrder = 'DESC';
    }
}
exports.SearchIdeasDto = SearchIdeasDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "keyword", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "officeId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "submittedById", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.IdeaStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.IdeaStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.IdeaStatus !== "undefined" && enums_1.IdeaStatus) === "function" ? _a : Object)
], SearchIdeasDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], SearchIdeasDto.prototype, "isOriginal", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchIdeasDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchIdeasDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['submissionDate', 'voteCount', 'title'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "sortBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['ASC', 'DESC'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchIdeasDto.prototype, "sortOrder", void 0);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCommentDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    tslib_1.__metadata("design:type", String)
], CreateCommentDto.prototype, "content", void 0);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const reviews_service_1 = __webpack_require__(78);
const reviews_controller_1 = __webpack_require__(79);
let ReviewsModule = class ReviewsModule {
};
exports.ReviewsModule = ReviewsModule;
exports.ReviewsModule = ReviewsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Review, entities_1.Idea])],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService],
        exports: [reviews_service_1.ReviewsService],
    })
], ReviewsModule);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const enums_1 = __webpack_require__(16);
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, ideaRepository, auditService) {
        this.reviewRepository = reviewRepository;
        this.ideaRepository = ideaRepository;
        this.auditService = auditService;
    }
    async create(createReviewDto, reviewer) {
        const idea = await this.ideaRepository.findOne({
            where: { id: createReviewDto.ideaId },
        });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        if (idea.submittedById === reviewer.id) {
            throw new common_1.BadRequestException('Cannot review your own idea');
        }
        if (idea.status !== enums_1.IdeaStatus.SUBMITTED && idea.status !== enums_1.IdeaStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException('Idea is not available for review');
        }
        const review = this.reviewRepository.create({
            ideaId: createReviewDto.ideaId,
            decision: createReviewDto.decision,
            comments: createReviewDto.comments,
            reviewerId: reviewer.id,
        });
        const savedReview = await this.reviewRepository.save(review);
        const newIdeaStatus = this.mapDecisionToIdeaStatus(createReviewDto.decision);
        idea.status = newIdeaStatus;
        await this.ideaRepository.save(idea);
        await this.auditService.log({
            action: 'CREATE_REVIEW',
            entityType: 'Review',
            entityId: savedReview.id,
            actorId: reviewer.id,
            newValues: {
                ideaId: idea.id,
                decision: createReviewDto.decision,
                newIdeaStatus,
            },
        });
        return this.findOne(savedReview.id);
    }
    async findAll(searchDto) {
        const { ideaId, reviewerId, decision, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.reviewer', 'reviewer')
            .leftJoinAndSelect('review.idea', 'idea');
        if (ideaId) {
            queryBuilder.andWhere('review.ideaId = :ideaId', { ideaId });
        }
        if (reviewerId) {
            queryBuilder.andWhere('review.reviewerId = :reviewerId', { reviewerId });
        }
        if (decision) {
            queryBuilder.andWhere('review.decision = :decision', { decision });
        }
        queryBuilder.orderBy('review.reviewDate', 'DESC');
        const [reviews, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: reviews,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['reviewer', 'idea', 'idea.submittedBy'],
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        return review;
    }
    async getReviewsByIdea(ideaId) {
        return this.reviewRepository.find({
            where: { ideaId },
            relations: ['reviewer'],
            order: { reviewDate: 'DESC' },
        });
    }
    async getMyReviews(reviewerId, searchDto) {
        return this.findAll({ ...searchDto, reviewerId });
    }
    mapDecisionToIdeaStatus(decision) {
        switch (decision) {
            case enums_1.ReviewDecision.APPROVED:
                return enums_1.IdeaStatus.APPROVED;
            case enums_1.ReviewDecision.REJECTED:
                return enums_1.IdeaStatus.REJECTED;
            case enums_1.ReviewDecision.CHANGES_REQUESTED:
                return enums_1.IdeaStatus.CHANGES_REQUESTED;
            default:
                return enums_1.IdeaStatus.UNDER_REVIEW;
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.Review)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Idea)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _c : Object])
], ReviewsService);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const reviews_service_1 = __webpack_require__(78);
const dto_1 = __webpack_require__(80);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(createReviewDto, user) {
        return this.reviewsService.create(createReviewDto, user);
    }
    findAll(searchDto) {
        return this.reviewsService.findAll(searchDto);
    }
    getMyReviews(searchDto, user) {
        return this.reviewsService.getMyReviews(user.id, searchDto);
    }
    getReviewsByIdea(ideaId) {
        return this.reviewsService.getReviewsByIdea(ideaId);
    }
    findOne(id) {
        return this.reviewsService.findOne(id);
    }
};
exports.ReviewsController = ReviewsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.KNOWLEDGE_CHAMPION, enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a review for an idea' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review submitted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Idea not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot review own idea or idea not available' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateReviewDto !== "undefined" && dto_1.CreateReviewDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.KNOWLEDGE_CHAMPION, enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list reviews' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.SearchReviewsDto !== "undefined" && dto_1.SearchReviewsDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-reviews'),
    (0, decorators_1.Roles)(enums_1.SystemRole.KNOWLEDGE_CHAMPION, enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.SearchReviewsDto !== "undefined" && dto_1.SearchReviewsDto) === "function" ? _e : Object, typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ReviewsController.prototype, "getMyReviews", null);
tslib_1.__decorate([
    (0, common_1.Get)('idea/:ideaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a specific idea' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('ideaId', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ReviewsController.prototype, "getReviewsByIdea", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
exports.ReviewsController = ReviewsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('reviews'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof reviews_service_1.ReviewsService !== "undefined" && reviews_service_1.ReviewsService) === "function" ? _a : Object])
], ReviewsController);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(81), exports);
tslib_1.__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateReviewDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ReviewDecision }),
    (0, class_validator_1.IsEnum)(enums_1.ReviewDecision),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ReviewDecision !== "undefined" && enums_1.ReviewDecision) === "function" ? _a : Object)
], CreateReviewDto.prototype, "decision", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "comments", void 0);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchReviewsDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
const enums_1 = __webpack_require__(16);
class SearchReviewsDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchReviewsDto = SearchReviewsDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchReviewsDto.prototype, "ideaId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchReviewsDto.prototype, "reviewerId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.ReviewDecision }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ReviewDecision),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ReviewDecision !== "undefined" && enums_1.ReviewDecision) === "function" ? _a : Object)
], SearchReviewsDto.prototype, "decision", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchReviewsDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchReviewsDto.prototype, "limit", void 0);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const projects_service_1 = __webpack_require__(84);
const projects_controller_1 = __webpack_require__(85);
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Project, entities_1.Milestone, entities_1.ProgressUpdate, entities_1.Idea, entities_1.User])],
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_service_1.ProjectsService],
        exports: [projects_service_1.ProjectsService],
    })
], ProjectsModule);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const enums_1 = __webpack_require__(16);
let ProjectsService = class ProjectsService {
    constructor(projectRepository, milestoneRepository, progressUpdateRepository, ideaRepository, userRepository, auditService) {
        this.projectRepository = projectRepository;
        this.milestoneRepository = milestoneRepository;
        this.progressUpdateRepository = progressUpdateRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.auditService = auditService;
    }
    async create(createProjectDto, creator) {
        const idea = await this.ideaRepository.findOne({
            where: { id: createProjectDto.basedOnIdeaId },
        });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        if (idea.status !== enums_1.IdeaStatus.APPROVED) {
            throw new common_1.BadRequestException('Can only create projects from approved ideas');
        }
        let teamMembers = [];
        if (createProjectDto.teamMemberIds?.length) {
            teamMembers = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(createProjectDto.teamMemberIds) },
            });
        }
        const project = this.projectRepository.create({
            title: createProjectDto.title,
            objective: createProjectDto.objective,
            description: createProjectDto.description,
            basedOnIdeaId: createProjectDto.basedOnIdeaId,
            createdById: creator.id,
            startDate: createProjectDto.startDate ? new Date(createProjectDto.startDate) : null,
            endDate: createProjectDto.endDate ? new Date(createProjectDto.endDate) : null,
            status: enums_1.ProjectStatus.ACTIVE,
            teamMembers,
        });
        const savedProject = await this.projectRepository.save(project);
        await this.auditService.log({
            action: 'CREATE_PROJECT',
            entityType: 'Project',
            entityId: savedProject.id,
            actorId: creator.id,
            newValues: { title: savedProject.title, basedOnIdeaId: idea.id },
        });
        return this.findOne(savedProject.id);
    }
    async findAll(searchDto) {
        const { title, basedOnIdeaId, createdById, status, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.createdBy', 'createdBy')
            .leftJoinAndSelect('project.basedOnIdea', 'basedOnIdea')
            .leftJoinAndSelect('project.teamMembers', 'teamMembers')
            .loadRelationCountAndMap('project.milestoneCount', 'project.milestones');
        if (title) {
            queryBuilder.andWhere('project.title ILIKE :title', { title: `%${title}%` });
        }
        if (basedOnIdeaId) {
            queryBuilder.andWhere('project.basedOnIdeaId = :basedOnIdeaId', { basedOnIdeaId });
        }
        if (createdById) {
            queryBuilder.andWhere('project.createdById = :createdById', { createdById });
        }
        if (status) {
            queryBuilder.andWhere('project.status = :status', { status });
        }
        queryBuilder.orderBy('project.createdAt', 'DESC');
        const [projects, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: projects,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['createdBy', 'basedOnIdea', 'teamMembers', 'milestones', 'progressUpdates', 'progressUpdates.updatedBy'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async update(id, updateProjectDto, user) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const canEdit = this.canEditProject(project, user);
        if (!canEdit) {
            throw new common_1.ForbiddenException('Not authorized to update this project');
        }
        const previousValues = {
            title: project.title,
            status: project.status,
        };
        if (updateProjectDto.teamMemberIds) {
            const teamMembers = await this.userRepository.find({
                where: { id: (0, typeorm_2.In)(updateProjectDto.teamMemberIds) },
            });
            project.teamMembers = teamMembers;
        }
        if (updateProjectDto.startDate) {
            project.startDate = new Date(updateProjectDto.startDate);
        }
        if (updateProjectDto.endDate) {
            project.endDate = new Date(updateProjectDto.endDate);
        }
        const { teamMemberIds, startDate, endDate, ...rest } = updateProjectDto;
        Object.assign(project, rest);
        const savedProject = await this.projectRepository.save(project);
        await this.auditService.log({
            action: 'UPDATE_PROJECT',
            entityType: 'Project',
            entityId: savedProject.id,
            actorId: user.id,
            previousValues,
            newValues: updateProjectDto,
        });
        return this.findOne(savedProject.id);
    }
    async addMilestone(projectId, createMilestoneDto, user) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['milestones'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const canEdit = this.canEditProject(project, user);
        if (!canEdit) {
            throw new common_1.ForbiddenException('Not authorized to add milestones');
        }
        const orderIndex = createMilestoneDto.orderIndex ?? project.milestones?.length ?? 0;
        const milestone = this.milestoneRepository.create({
            title: createMilestoneDto.title,
            description: createMilestoneDto.description,
            dueDate: new Date(createMilestoneDto.dueDate),
            projectId,
            status: enums_1.MilestoneStatus.PENDING,
            orderIndex,
        });
        const savedMilestone = await this.milestoneRepository.save(milestone);
        await this.auditService.log({
            action: 'ADD_MILESTONE',
            entityType: 'Milestone',
            entityId: savedMilestone.id,
            actorId: user.id,
            newValues: { projectId, title: savedMilestone.title },
        });
        return savedMilestone;
    }
    async updateMilestone(projectId, milestoneId, updateMilestoneDto, user) {
        const milestone = await this.milestoneRepository.findOne({
            where: { id: milestoneId, projectId },
            relations: ['project'],
        });
        if (!milestone) {
            throw new common_1.NotFoundException('Milestone not found');
        }
        const canEdit = this.canEditProject(milestone.project, user);
        if (!canEdit) {
            throw new common_1.ForbiddenException('Not authorized to update milestone');
        }
        const previousValues = {
            title: milestone.title,
            status: milestone.status,
        };
        if (updateMilestoneDto.dueDate) {
            milestone.dueDate = new Date(updateMilestoneDto.dueDate);
        }
        const { dueDate, ...rest } = updateMilestoneDto;
        Object.assign(milestone, rest);
        const savedMilestone = await this.milestoneRepository.save(milestone);
        await this.auditService.log({
            action: 'UPDATE_MILESTONE',
            entityType: 'Milestone',
            entityId: savedMilestone.id,
            actorId: user.id,
            previousValues,
            newValues: updateMilestoneDto,
        });
        return savedMilestone;
    }
    async deleteMilestone(projectId, milestoneId, user) {
        const milestone = await this.milestoneRepository.findOne({
            where: { id: milestoneId, projectId },
            relations: ['project'],
        });
        if (!milestone) {
            throw new common_1.NotFoundException('Milestone not found');
        }
        const canEdit = this.canEditProject(milestone.project, user);
        if (!canEdit) {
            throw new common_1.ForbiddenException('Not authorized to delete milestone');
        }
        await this.milestoneRepository.remove(milestone);
        await this.auditService.log({
            action: 'DELETE_MILESTONE',
            entityType: 'Milestone',
            entityId: milestoneId,
            actorId: user.id,
            previousValues: { title: milestone.title },
        });
        return { message: 'Milestone deleted successfully' };
    }
    async addProgressUpdate(projectId, createProgressUpdateDto, user) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const isTeamMember = project.teamMembers?.some((m) => m.id === user.id) || project.createdById === user.id;
        const isAdmin = user.roles?.some((r) => [enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER].includes(r.name));
        if (!isTeamMember && !isAdmin) {
            throw new common_1.ForbiddenException('Only team members can add progress updates');
        }
        if (createProgressUpdateDto.milestoneId) {
            const milestone = await this.milestoneRepository.findOne({
                where: { id: createProgressUpdateDto.milestoneId, projectId },
            });
            if (!milestone) {
                throw new common_1.NotFoundException('Milestone not found in this project');
            }
        }
        const progressUpdate = this.progressUpdateRepository.create({
            notes: createProgressUpdateDto.notes,
            projectId,
            milestoneId: createProgressUpdateDto.milestoneId,
            attachmentPaths: createProgressUpdateDto.attachmentPaths,
            updatedById: user.id,
        });
        const savedUpdate = await this.progressUpdateRepository.save(progressUpdate);
        await this.auditService.log({
            action: 'ADD_PROGRESS_UPDATE',
            entityType: 'ProgressUpdate',
            entityId: savedUpdate.id,
            actorId: user.id,
            newValues: { projectId, milestoneId: createProgressUpdateDto.milestoneId },
        });
        return this.progressUpdateRepository.findOne({
            where: { id: savedUpdate.id },
            relations: ['updatedBy', 'milestone'],
        });
    }
    async getProjectProgress(projectId) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['milestones'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const totalMilestones = project.milestones?.length || 0;
        const completedMilestones = project.milestones?.filter((m) => m.status === enums_1.MilestoneStatus.COMPLETED).length || 0;
        const inProgressMilestones = project.milestones?.filter((m) => m.status === enums_1.MilestoneStatus.IN_PROGRESS).length || 0;
        return {
            projectId,
            status: project.status,
            totalMilestones,
            completedMilestones,
            inProgressMilestones,
            pendingMilestones: totalMilestones - completedMilestones - inProgressMilestones,
            progressPercentage: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0,
        };
    }
    async getMyProjects(user, searchDto) {
        const { title, status, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.createdBy', 'createdBy')
            .leftJoinAndSelect('project.basedOnIdea', 'basedOnIdea')
            .leftJoin('project.teamMembers', 'teamMember')
            .where('(project.createdById = :userId OR teamMember.id = :userId)', { userId: user.id });
        if (title) {
            queryBuilder.andWhere('project.title ILIKE :title', { title: `%${title}%` });
        }
        if (status) {
            queryBuilder.andWhere('project.status = :status', { status });
        }
        queryBuilder.orderBy('project.createdAt', 'DESC');
        const [projects, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: projects,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async addTeamMember(projectId, userId, currentUser) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (!this.canEditProject(project, currentUser)) {
            throw new common_1.ForbiddenException('Not authorized to manage team members');
        }
        const userToAdd = await this.userRepository.findOne({ where: { id: userId } });
        if (!userToAdd) {
            throw new common_1.NotFoundException('User not found');
        }
        const alreadyMember = project.teamMembers?.some((m) => m.id === userId);
        if (alreadyMember) {
            throw new common_1.ForbiddenException('User is already a team member');
        }
        project.teamMembers = [...(project.teamMembers || []), userToAdd];
        await this.projectRepository.save(project);
        await this.auditService.log({
            action: 'ADD_TEAM_MEMBER',
            entityType: 'Project',
            entityId: project.id,
            actorId: currentUser.id,
            newValues: { userId, userName: userToAdd.name },
        });
        return this.findOne(projectId);
    }
    async removeTeamMember(projectId, userId, currentUser) {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        if (!this.canEditProject(project, currentUser)) {
            throw new common_1.ForbiddenException('Not authorized to manage team members');
        }
        const memberIndex = project.teamMembers?.findIndex((m) => m.id === userId);
        if (memberIndex === undefined || memberIndex === -1) {
            throw new common_1.NotFoundException('User is not a team member');
        }
        const removedUser = project.teamMembers[memberIndex];
        project.teamMembers = project.teamMembers.filter((m) => m.id !== userId);
        await this.projectRepository.save(project);
        await this.auditService.log({
            action: 'REMOVE_TEAM_MEMBER',
            entityType: 'Project',
            entityId: project.id,
            actorId: currentUser.id,
            previousValues: { userId, userName: removedUser.name },
        });
        return this.findOne(projectId);
    }
    canEditProject(project, user) {
        const isCreator = project.createdById === user.id;
        const isTeamMember = project.teamMembers?.some((m) => m.id === user.id);
        const isAdmin = user.roles?.some((r) => [enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER].includes(r.name));
        return isCreator || isTeamMember || isAdmin;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.Project)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Milestone)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(entities_1.ProgressUpdate)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(entities_1.Idea)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(entities_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _f : Object])
], ProjectsService);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const projects_service_1 = __webpack_require__(84);
const dto_1 = __webpack_require__(86);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto, user) {
        return this.projectsService.create(createProjectDto, user);
    }
    findAll(searchDto) {
        return this.projectsService.findAll(searchDto);
    }
    getMyProjects(searchDto, user) {
        return this.projectsService.getMyProjects(user, searchDto);
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    getProgress(id) {
        return this.projectsService.getProjectProgress(id);
    }
    update(id, updateProjectDto, user) {
        return this.projectsService.update(id, updateProjectDto, user);
    }
    addMilestone(id, createMilestoneDto, user) {
        return this.projectsService.addMilestone(id, createMilestoneDto, user);
    }
    updateMilestone(id, milestoneId, updateMilestoneDto, user) {
        return this.projectsService.updateMilestone(id, milestoneId, updateMilestoneDto, user);
    }
    deleteMilestone(id, milestoneId, user) {
        return this.projectsService.deleteMilestone(id, milestoneId, user);
    }
    addProgressUpdate(id, createProgressUpdateDto, user) {
        return this.projectsService.addProgressUpdate(id, createProgressUpdateDto, user);
    }
    addTeamMember(id, body, user) {
        return this.projectsService.addTeamMember(id, body.userId, user);
    }
    removeTeamMember(id, userId, user) {
        return this.projectsService.removeTeamMember(id, userId, user);
    }
};
exports.ProjectsController = ProjectsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new project from approved idea' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Project created successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateProjectDto !== "undefined" && dto_1.CreateProjectDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list projects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projects retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.SearchProjectsDto !== "undefined" && dto_1.SearchProjectsDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-projects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get projects where user is creator or team member' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projects retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.SearchProjectsDto !== "undefined" && dto_1.SearchProjectsDto) === "function" ? _e : Object, typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "getMyProjects", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project progress summary' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProgress", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_g = typeof dto_1.UpdateProjectDto !== "undefined" && dto_1.UpdateProjectDto) === "function" ? _g : Object, typeof (_h = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/milestones'),
    (0, swagger_1.ApiOperation)({ summary: 'Add milestone to project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Milestone added successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_j = typeof dto_1.CreateMilestoneDto !== "undefined" && dto_1.CreateMilestoneDto) === "function" ? _j : Object, typeof (_k = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "addMilestone", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/milestones/:milestoneId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update milestone' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Milestone updated successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Param)('milestoneId', common_1.ParseUUIDPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__param(3, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_l = typeof dto_1.UpdateMilestoneDto !== "undefined" && dto_1.UpdateMilestoneDto) === "function" ? _l : Object, typeof (_m = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateMilestone", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id/milestones/:milestoneId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete milestone' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Milestone deleted successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Param)('milestoneId', common_1.ParseUUIDPipe)),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_o = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "deleteMilestone", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/progress-updates'),
    (0, swagger_1.ApiOperation)({ summary: 'Add progress update to project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Progress update added successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_p = typeof dto_1.CreateProgressUpdateDto !== "undefined" && dto_1.CreateProgressUpdateDto) === "function" ? _p : Object, typeof (_q = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "addProgressUpdate", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/team'),
    (0, swagger_1.ApiOperation)({ summary: 'Add team member to project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Team member added successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_r = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _r : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "addTeamMember", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id/team/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove team member from project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Team member removed successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__param(1, (0, common_1.Param)('userId', new common_1.ParseUUIDPipe({ version: undefined }))),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_s = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _s : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeTeamMember", null);
exports.ProjectsController = ProjectsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof projects_service_1.ProjectsService !== "undefined" && projects_service_1.ProjectsService) === "function" ? _a : Object])
], ProjectsController);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProjectDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "basedOnIdeaId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "objective", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateProjectDto.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateProjectDto.prototype, "teamMemberIds", void 0);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProjectDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class UpdateProjectDto {
}
exports.UpdateProjectDto = UpdateProjectDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    tslib_1.__metadata("design:type", String)
], UpdateProjectDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateProjectDto.prototype, "objective", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.ProjectStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProjectStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ProjectStatus !== "undefined" && enums_1.ProjectStatus) === "function" ? _a : Object)
], UpdateProjectDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], UpdateProjectDto.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], UpdateProjectDto.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateProjectDto.prototype, "teamMemberIds", void 0);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMilestoneDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateMilestoneDto {
}
exports.CreateMilestoneDto = CreateMilestoneDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    tslib_1.__metadata("design:type", String)
], CreateMilestoneDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateMilestoneDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateMilestoneDto.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], CreateMilestoneDto.prototype, "orderIndex", void 0);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMilestoneDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class UpdateMilestoneDto {
}
exports.UpdateMilestoneDto = UpdateMilestoneDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    tslib_1.__metadata("design:type", String)
], UpdateMilestoneDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateMilestoneDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], UpdateMilestoneDto.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.MilestoneStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MilestoneStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.MilestoneStatus !== "undefined" && enums_1.MilestoneStatus) === "function" ? _a : Object)
], UpdateMilestoneDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], UpdateMilestoneDto.prototype, "orderIndex", void 0);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProgressUpdateDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateProgressUpdateDto {
}
exports.CreateProgressUpdateDto = CreateProgressUpdateDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    tslib_1.__metadata("design:type", String)
], CreateProgressUpdateDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateProgressUpdateDto.prototype, "milestoneId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateProgressUpdateDto.prototype, "attachmentPaths", void 0);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchProjectsDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
const enums_1 = __webpack_require__(16);
class SearchProjectsDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchProjectsDto = SearchProjectsDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SearchProjectsDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchProjectsDto.prototype, "basedOnIdeaId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchProjectsDto.prototype, "createdById", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.ProjectStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProjectStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.ProjectStatus !== "undefined" && enums_1.ProjectStatus) === "function" ? _a : Object)
], SearchProjectsDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchProjectsDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchProjectsDto.prototype, "limit", void 0);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardsModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const rewards_service_1 = __webpack_require__(94);
const rewards_controller_1 = __webpack_require__(95);
let RewardsModule = class RewardsModule {
};
exports.RewardsModule = RewardsModule;
exports.RewardsModule = RewardsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Reward, entities_1.Nomination, entities_1.Project, entities_1.User])],
        controllers: [rewards_controller_1.RewardsController],
        providers: [rewards_service_1.RewardsService],
        exports: [rewards_service_1.RewardsService],
    })
], RewardsModule);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardsService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(15);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const enums_1 = __webpack_require__(16);
let RewardsService = class RewardsService {
    constructor(rewardRepository, nominationRepository, projectRepository, userRepository, auditService) {
        this.rewardRepository = rewardRepository;
        this.nominationRepository = nominationRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.auditService = auditService;
    }
    async createNomination(createNominationDto, nominatorId) {
        const project = await this.projectRepository.findOne({
            where: { id: createNominationDto.projectId },
            relations: ['teamMembers'],
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const nominatedUser = await this.userRepository.findOne({
            where: { id: createNominationDto.nominatedUserId },
        });
        if (!nominatedUser) {
            throw new common_1.NotFoundException('Nominated user not found');
        }
        const isTeamMember = project.teamMembers?.some((m) => m.id === createNominationDto.nominatedUserId);
        if (!isTeamMember && project.createdById !== createNominationDto.nominatedUserId) {
            throw new common_1.BadRequestException('Nominated user must be a team member of the project');
        }
        if (createNominationDto.nominatedUserId === nominatorId) {
            throw new common_1.BadRequestException('Cannot nominate yourself');
        }
        const existingNomination = await this.nominationRepository.findOne({
            where: {
                projectId: createNominationDto.projectId,
                nominatedUserId: createNominationDto.nominatedUserId,
                nominatedById: nominatorId,
            },
        });
        if (existingNomination) {
            throw new common_1.BadRequestException('You have already nominated this user for this project');
        }
        const nomination = this.nominationRepository.create({
            ...createNominationDto,
            nominatedById: nominatorId,
            status: enums_1.NominationStatus.PENDING,
        });
        const savedNomination = await this.nominationRepository.save(nomination);
        await this.auditService.log({
            action: 'CREATE_NOMINATION',
            entityType: 'Nomination',
            entityId: savedNomination.id,
            actorId: nominatorId,
            newValues: {
                projectId: createNominationDto.projectId,
                nominatedUserId: createNominationDto.nominatedUserId,
            },
        });
        return this.getNomination(savedNomination.id);
    }
    async getNomination(id) {
        const nomination = await this.nominationRepository.findOne({
            where: { id },
            relations: ['project', 'nominatedUser', 'nominatedBy'],
        });
        if (!nomination) {
            throw new common_1.NotFoundException('Nomination not found');
        }
        return nomination;
    }
    async getPendingNominations(page = 1, limit = 20) {
        const [nominations, total] = await this.nominationRepository.findAndCount({
            where: { status: enums_1.NominationStatus.PENDING },
            relations: ['project', 'nominatedUser', 'nominatedBy'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            items: nominations,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateNomination(id, updateNominationDto, actorId) {
        const nomination = await this.nominationRepository.findOne({
            where: { id },
            relations: ['nominatedUser'],
        });
        if (!nomination) {
            throw new common_1.NotFoundException('Nomination not found');
        }
        const previousStatus = nomination.status;
        nomination.status = updateNominationDto.status;
        await this.nominationRepository.save(nomination);
        if (updateNominationDto.status === enums_1.NominationStatus.APPROVED) {
            await this.createReward({
                recipientId: nomination.nominatedUserId,
                rewardType: enums_1.RewardType.BADGE,
                badgeName: 'Team Excellence',
                points: 50,
                description: `Nominated for excellent contribution to project`,
                projectId: nomination.projectId,
            }, actorId);
        }
        await this.auditService.log({
            action: 'UPDATE_NOMINATION',
            entityType: 'Nomination',
            entityId: id,
            actorId,
            previousValues: { status: previousStatus },
            newValues: { status: updateNominationDto.status },
        });
        return this.getNomination(id);
    }
    async createReward(createRewardDto, awarderId) {
        const recipient = await this.userRepository.findOne({
            where: { id: createRewardDto.recipientId },
        });
        if (!recipient) {
            throw new common_1.NotFoundException('Recipient not found');
        }
        if (createRewardDto.projectId) {
            const project = await this.projectRepository.findOne({
                where: { id: createRewardDto.projectId },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
        }
        const reward = this.rewardRepository.create({
            ...createRewardDto,
            awardedById: awarderId,
        });
        const savedReward = await this.rewardRepository.save(reward);
        await this.auditService.log({
            action: 'CREATE_REWARD',
            entityType: 'Reward',
            entityId: savedReward.id,
            actorId: awarderId,
            newValues: {
                recipientId: createRewardDto.recipientId,
                rewardType: createRewardDto.rewardType,
                points: createRewardDto.points,
            },
        });
        return this.rewardRepository.findOne({
            where: { id: savedReward.id },
            relations: ['recipient', 'awardedBy', 'project'],
        });
    }
    async findAllRewards(searchDto) {
        const { recipientId, rewardType, projectId, page = 1, limit = 20 } = searchDto;
        const queryBuilder = this.rewardRepository
            .createQueryBuilder('reward')
            .leftJoinAndSelect('reward.recipient', 'recipient')
            .leftJoinAndSelect('reward.awardedBy', 'awardedBy')
            .leftJoinAndSelect('reward.project', 'project');
        if (recipientId) {
            queryBuilder.andWhere('reward.recipientId = :recipientId', { recipientId });
        }
        if (rewardType) {
            queryBuilder.andWhere('reward.rewardType = :rewardType', { rewardType });
        }
        if (projectId) {
            queryBuilder.andWhere('reward.projectId = :projectId', { projectId });
        }
        queryBuilder.orderBy('reward.awardedAt', 'DESC');
        const [rewards, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            items: rewards,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getMyRewards(userId, searchDto) {
        return this.findAllRewards({ ...searchDto, recipientId: userId });
    }
    async getLeaderboard(limit = 10) {
        const leaderboard = await this.rewardRepository
            .createQueryBuilder('reward')
            .select('reward.recipientId', 'userId')
            .addSelect('user.id', 'id')
            .addSelect('user.name', 'name')
            .addSelect('user.email', 'email')
            .addSelect('user.totalPoints', 'userTotalPoints')
            .addSelect('user.officeId', 'officeId')
            .addSelect('SUM(reward.points)', 'totalPoints')
            .addSelect('COUNT(DISTINCT CASE WHEN reward.rewardType = :badgeType THEN reward.id END)', 'badgeCount')
            .addSelect('COUNT(DISTINCT CASE WHEN reward.rewardType = :certType THEN reward.id END)', 'certificateCount')
            .innerJoin('reward.recipient', 'user')
            .leftJoin('user.office', 'office')
            .addSelect('office.name', 'officeName')
            .setParameter('badgeType', enums_1.RewardType.BADGE)
            .setParameter('certType', enums_1.RewardType.CERTIFICATE)
            .groupBy('reward.recipientId')
            .addGroupBy('user.id')
            .addGroupBy('user.name')
            .addGroupBy('user.email')
            .addGroupBy('user.totalPoints')
            .addGroupBy('user.officeId')
            .addGroupBy('office.name')
            .orderBy('SUM(reward.points)', 'DESC')
            .limit(limit)
            .getRawMany();
        return leaderboard.map((entry, index) => ({
            rank: index + 1,
            id: entry.id,
            userId: entry.userId,
            name: entry.name,
            email: entry.email,
            totalPoints: parseInt(entry.totalPoints, 10) || 0,
            badgeCount: parseInt(entry.badgeCount, 10) || 0,
            badgesEarned: parseInt(entry.badgeCount, 10) || 0,
            certificateCount: parseInt(entry.certificateCount, 10) || 0,
            office: entry.officeName ? { name: entry.officeName } : null,
            ideasSubmitted: 0,
            ideasApproved: 0,
        }));
    }
    async getUserStats(userId) {
        const rewards = await this.rewardRepository.find({
            where: { recipientId: userId },
        });
        const totalPoints = rewards.reduce((sum, r) => sum + (r.points || 0), 0);
        const badges = rewards.filter((r) => r.rewardType === enums_1.RewardType.BADGE);
        const certificates = rewards.filter((r) => r.rewardType === enums_1.RewardType.CERTIFICATE);
        const rank = await this.rewardRepository
            .createQueryBuilder('reward')
            .select('reward.recipientId')
            .addSelect('SUM(reward.points)', 'totalPoints')
            .groupBy('reward.recipientId')
            .having('SUM(reward.points) > :userPoints', { userPoints: totalPoints })
            .getCount();
        return {
            userId,
            totalPoints,
            badgeCount: badges.length,
            certificateCount: certificates.length,
            rank: rank + 1,
            recentRewards: rewards.slice(0, 5),
        };
    }
};
exports.RewardsService = RewardsService;
exports.RewardsService = RewardsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.Reward)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(entities_1.Nomination)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(entities_1.Project)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(entities_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _e : Object])
], RewardsService);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardsController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const rewards_service_1 = __webpack_require__(94);
const dto_1 = __webpack_require__(96);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
const entities_1 = __webpack_require__(13);
let RewardsController = class RewardsController {
    constructor(rewardsService) {
        this.rewardsService = rewardsService;
    }
    createNomination(createNominationDto, user) {
        return this.rewardsService.createNomination(createNominationDto, user.id);
    }
    getPendingNominations(page, limit) {
        return this.rewardsService.getPendingNominations(page, limit);
    }
    getNomination(id) {
        return this.rewardsService.getNomination(id);
    }
    updateNomination(id, updateNominationDto, user) {
        return this.rewardsService.updateNomination(id, updateNominationDto, user.id);
    }
    createReward(createRewardDto, user) {
        return this.rewardsService.createReward(createRewardDto, user.id);
    }
    findAll(searchDto) {
        return this.rewardsService.findAllRewards(searchDto);
    }
    getMyRewards(searchDto, user) {
        return this.rewardsService.getMyRewards(user.id, searchDto);
    }
    getLeaderboard(limit) {
        return this.rewardsService.getLeaderboard(limit);
    }
    getUserStats(userId) {
        return this.rewardsService.getUserStats(userId);
    }
    getMyStats(user) {
        return this.rewardsService.getUserStats(user.id);
    }
};
exports.RewardsController = RewardsController;
tslib_1.__decorate([
    (0, common_1.Post)('nominations'),
    (0, swagger_1.ApiOperation)({ summary: 'Nominate a team member for recognition' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Nomination created successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateNominationDto !== "undefined" && dto_1.CreateNominationDto) === "function" ? _b : Object, typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "createNomination", null);
tslib_1.__decorate([
    (0, common_1.Get)('nominations/pending'),
    (0, decorators_1.Roles)(enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending nominations for review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nominations retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)('page')),
    tslib_1.__param(1, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getPendingNominations", null);
tslib_1.__decorate([
    (0, common_1.Get)('nominations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get nomination by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nomination retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getNomination", null);
tslib_1.__decorate([
    (0, common_1.Patch)('nominations/:id'),
    (0, decorators_1.Roles)(enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a nomination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nomination updated successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof dto_1.UpdateNominationDto !== "undefined" && dto_1.UpdateNominationDto) === "function" ? _d : Object, typeof (_e = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "updateNomination", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.INNOVATION_MANAGER, enums_1.SystemRole.SYSTEM_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Award a reward to a user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reward created successfully' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof dto_1.CreateRewardDto !== "undefined" && dto_1.CreateRewardDto) === "function" ? _f : Object, typeof (_g = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "createReward", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search and list rewards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rewards retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof dto_1.SearchRewardsDto !== "undefined" && dto_1.SearchRewardsDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-rewards'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user rewards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rewards retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof dto_1.SearchRewardsDto !== "undefined" && dto_1.SearchRewardsDto) === "function" ? _j : Object, typeof (_k = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getMyRewards", null);
tslib_1.__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rewards leaderboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leaderboard retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getLeaderboard", null);
tslib_1.__decorate([
    (0, common_1.Get)('stats/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user reward statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stats retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getUserStats", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user reward statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stats retrieved successfully' }),
    tslib_1.__param(0, (0, decorators_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RewardsController.prototype, "getMyStats", null);
exports.RewardsController = RewardsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('rewards'),
    (0, common_1.Controller)('rewards'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof rewards_service_1.RewardsService !== "undefined" && rewards_service_1.RewardsService) === "function" ? _a : Object])
], RewardsController);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(5);
tslib_1.__exportStar(__webpack_require__(97), exports);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNominationDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
class CreateNominationDto {
}
exports.CreateNominationDto = CreateNominationDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)('all'),
    tslib_1.__metadata("design:type", String)
], CreateNominationDto.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)('all'),
    tslib_1.__metadata("design:type", String)
], CreateNominationDto.prototype, "nominatedUserId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    tslib_1.__metadata("design:type", String)
], CreateNominationDto.prototype, "justification", void 0);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateNominationDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class UpdateNominationDto {
}
exports.UpdateNominationDto = UpdateNominationDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.NominationStatus }),
    (0, class_validator_1.IsEnum)(enums_1.NominationStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.NominationStatus !== "undefined" && enums_1.NominationStatus) === "function" ? _a : Object)
], UpdateNominationDto.prototype, "status", void 0);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRewardDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const enums_1 = __webpack_require__(16);
class CreateRewardDto {
}
exports.CreateRewardDto = CreateRewardDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateRewardDto.prototype, "recipientId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.RewardType }),
    (0, class_validator_1.IsEnum)(enums_1.RewardType),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.RewardType !== "undefined" && enums_1.RewardType) === "function" ? _a : Object)
], CreateRewardDto.prototype, "rewardType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], CreateRewardDto.prototype, "points", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRewardDto.prototype, "badgeName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRewardDto.prototype, "certificateTitle", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateRewardDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], CreateRewardDto.prototype, "projectId", void 0);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchRewardsDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(60);
const enums_1 = __webpack_require__(16);
class SearchRewardsDto {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
exports.SearchRewardsDto = SearchRewardsDto;
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchRewardsDto.prototype, "recipientId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.RewardType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.RewardType),
    tslib_1.__metadata("design:type", typeof (_a = typeof enums_1.RewardType !== "undefined" && enums_1.RewardType) === "function" ? _a : Object)
], SearchRewardsDto.prototype, "rewardType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], SearchRewardsDto.prototype, "projectId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchRewardsDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], SearchRewardsDto.prototype, "limit", void 0);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const entities_1 = __webpack_require__(13);
const audit_service_1 = __webpack_require__(35);
const audit_controller_1 = __webpack_require__(102);
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.AuditLog])],
        controllers: [audit_controller_1.AuditController],
        providers: [audit_service_1.AuditService],
        exports: [audit_service_1.AuditService],
    })
], AuditModule);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const audit_service_1 = __webpack_require__(35);
const guards_1 = __webpack_require__(43);
const decorators_1 = __webpack_require__(47);
const enums_1 = __webpack_require__(16);
let AuditController = class AuditController {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async findAll(page, limit, entityType, action, actorId, search) {
        return this.auditService.findAll({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            entityType,
            action,
            actorId,
            search,
        });
    }
    async findByEntity(entityType, entityId) {
        return this.auditService.findByEntityId(entityType, entityId);
    }
};
exports.AuditController = AuditController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Audit logs retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'entityType', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'action', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'actorId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    tslib_1.__param(0, (0, common_1.Query)('page')),
    tslib_1.__param(1, (0, common_1.Query)('limit')),
    tslib_1.__param(2, (0, common_1.Query)('entityType')),
    tslib_1.__param(3, (0, common_1.Query)('action')),
    tslib_1.__param(4, (0, common_1.Query)('actorId')),
    tslib_1.__param(5, (0, common_1.Query)('search')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('entity/:entityType/:entityId'),
    (0, decorators_1.Roles)(enums_1.SystemRole.SYSTEM_ADMIN, enums_1.SystemRole.INNOVATION_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs for specific entity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Audit logs retrieved successfully' }),
    tslib_1.__param(0, (0, common_1.Param)('entityType')),
    tslib_1.__param(1, (0, common_1.Param)('entityId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuditController.prototype, "findByEntity", null);
exports.AuditController = AuditController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('audit'),
    (0, common_1.Controller)('audit'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _a : Object])
], AuditController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DKN API')
        .setDescription('Digital Knowledge Network API for Velion Dynamics')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management endpoints')
        .addTag('offices', 'Office management endpoints')
        .addTag('ideas', 'Idea submission and crowdsourcing endpoints')
        .addTag('reviews', 'Idea review endpoints')
        .addTag('projects', 'Innovation project management endpoints')
        .addTag('rewards', 'Recognition and rewards endpoints')
        .addTag('audit', 'Audit log endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    common_1.Logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map