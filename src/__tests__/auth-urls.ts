/* eslint-disable max-nested-callbacks */
import {expect} from "chai"
import querystring from "querystring"

import {Moneyhub, MoneyhubInstance} from ".."

const bankId = "1ffe704d39629a929c8e293880fb449a"
const state = "sample-state"
const nonce = "sample-nonce"

const REQUEST_URI_REGEX = /urn:ietf:params:oauth:request_uri:.+/

describe("Auth Urls", function() {
  let moneyhub: MoneyhubInstance,
    testReadOnlyUserId: string

  before(async function() {
    testReadOnlyUserId = this.config.testReadOnlyUserId
    moneyhub = await Moneyhub(this.config)
  })

  it("gets a basic auth url", async function() {
    const url = await moneyhub.getAuthorizeUrl({
      state,
      nonce,
      scope: `openid id:${bankId} accounts:read`,
    })

    const {request_uri} = querystring.parse(url.split("?")[1])

    expect(url).to.be.a("string")
    expect(request_uri).to.match(REQUEST_URI_REGEX)
  })

  it("gets a basic auth url with permissions", async function() {
    const url = await moneyhub.getAuthorizeUrl({
      state,
      nonce,
      scope: `openid id:${bankId} accounts:read`,
      permissions: ["permission-1"],
    })

    const {request_uri} = querystring.parse(url.split("?")[1])

    expect(url).to.be.a("string")
    expect(request_uri).to.match(REQUEST_URI_REGEX)
  })

  it("gets an auth url for a user", async function() {
    const url = await moneyhub.getAuthorizeUrlForCreatedUser({
      state,
      nonce,
      bankId,
      userId: "some-user-id",
    })

    const {request_uri} = querystring.parse(url.split("?")[1])

    expect(url).to.be.a("string")
    expect(request_uri).to.match(REQUEST_URI_REGEX)
  })

  it("gets an auth url for a user with extra permissions", async function() {
    const url = await moneyhub.getAuthorizeUrlForCreatedUser({
      state,
      nonce,
      bankId,
      userId: "some-user-id",
      permissions: ["permission-1"],
    })

    const {request_uri} = querystring.parse(url.split("?")[1])

    expect(url).to.be.a("string")
    expect(request_uri).to.match(REQUEST_URI_REGEX)
  })

  it("gets a payment auth url", async function() {
    const payee = await moneyhub.addPayee({
      accountNumber: "12345678",
      sortCode: "123456",
      name: "Test",
    })

    const url = await moneyhub.getPaymentAuthorizeUrl({
      bankId,
      payeeId: payee.data.id,
      payeeRef: "ref",
      amount: 1,
      payerRef: "another-ref",
      state,
      nonce,
    })

    expect(url).to.be.a("string")
  })

  it("gets a payment auth url without payeeId", async function() {
    const payee = {
      accountNumber: "12345678",
      sortCode: "123456",
      name: "Test",
    }

    const url = await moneyhub.getPaymentAuthorizeUrl({
      bankId,
      payee,
      payeeRef: "ref",
      amount: 1,
      payerRef: "another-ref",
      state,
      nonce,
    })

    expect(url).to.be.a("string")
  })

  it("gets a reconsent url for a user", async function() {
    const connections = await moneyhub.getUserConnections({
      userId: testReadOnlyUserId,
    })
    const connectionId = connections.data[0].id
    const url = await moneyhub.getReconsentAuthorizeUrlForCreatedUser({
      state,
      nonce,
      userId: "some-user-id",
      connectionId,
    })

    const {request_uri} = querystring.parse(url.split("?")[1])

    expect(url).to.be.a("string")
    expect(request_uri).to.match(REQUEST_URI_REGEX)
  })
})
