"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
var typeorm_1 = require("typeorm");
var UserRepositories_1 = require("../repositories/UserRepositories");
var bcryptjs_1 = require("bcryptjs");
var CreateUserService = /** @class */ (function () {
function CreateUserService() {

    CreateUserService.prototype.execute = function (_a, res) {
        var firstname = _a.firstname, lastname = _a.lastname, email = _a.email, password = _a.password, confirmpassword = _a.confirmpassword;
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, invalidFirstName, invalidLastName, userMail, userAccountExists, passwordHash, user, error_1;
            
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:

                        _b.trys.push([0, 5, , 6]);
                        usersRepository = typeorm_1.getCustomRepository(UserRepositories_1.UsersRepositories);
                        invalidFirstName = firstname.replace(/[&\!@/ #,+()$~%.'":*?<>{}]/g, '');
                        invalidLastName = lastname.replace(/[&\!@/# ,+()$~%.'":*?<>{}]/g, '');
                        if (firstname !== invalidFirstName || lastname !== invalidLastName) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Tem certeza de que inseriu seu nome corretamente?'
                                })];
                        }
                        // Names
                        if (firstname.trim() === '' && lastname.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: "Digite o nome e o sobrenome"
                                })];
                        }
                        if (lastname.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: "Digite o sobrenome"
                                })];
                        }
                        if (firstname.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Digite o nome'
                                })];
                        }
                        userMail = email.toLocaleLowerCase().replace(/[&\!/\\@#,+ ()$~%'":*?<>{}]/g, '');
                        if (email.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Digite um e-mail'
                                })];
                        }
                        if (userMail != email) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Somente letras (a - z), números (0 - 9) e pontos (.) são permitidos.'
                                })];
                        }
                        if (email.length < 6 || email.length > 30) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Seu nome de usuário deve ter entre 6 e 30 caracteres.'
                                })];
                        }
                        //
                        if (email.search('gmail') != -1 || email.search('google') != -1) {
                            return [2 /*return*/, res.status(403).json({
                                    message: 'Este nome de usuário não é permitido. Tente novamente.'
                                })];
                        }
                        //
                        userMail += '@gmail.com';
                        return [4 /*yield*/, usersRepository.findOne({
                                email: userMail
                            })];
                    case 1:
                        userAccountExists = _b.sent();
                        if (userAccountExists) {
                            return [2 /*return*/, res.status(409).json({
                                    message: "Este nome de usuário já está em uso. Tente outro."
                                })];
                        }
                        if (password.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Digite uma senha'
                                })];
                        }
                        if (password.length < 6 || password.length > 18) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "Sua senha deve ter entre 6 e 18 caracteres"
                                })];
                        }
                        if (confirmpassword.trim() === '') {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Confirme sua senha'
                                })];
                        }
                        if (confirmpassword != password) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'As senhas não são iguais. Tente novamente.'
                                })];
                        }
                        console.log('cdsadsa')
                        if (!!userAccountExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcryptjs_1.hash(password, 8)];
                    case 2:

                        passwordHash = _b.sent();
                        user = usersRepository.create({
                            firstname: firstname,
                            lastname: lastname,
                            email: userMail,
                            password: passwordHash
                        });
                        return [4 /*yield*/, usersRepository.save(user)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(user)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1.stack);
                        return [2 /*return*/, res.status(500).json({ message: error_1.message, stack: error_1.stack })];
                    case 6: return [2 /*return*/];
                }
            });
        });
        }
    };
    return CreateUserService;
}());
exports.CreateUserService = CreateUserService;
