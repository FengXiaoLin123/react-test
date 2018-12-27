import React from 'react';
import { Icon } from 'antd';
// import { FacebookSvg, InstagramSvg, YouTubeSvg, WeiboSvg } from 'statics/svg/FooterSvg';
import { FacebookSvg } from 'statics/svg/FooterSvg';

const FooterWrap = (props) => {
  console.log(props, '5555');
  return (
    <footer className="rt-common-footer-wrap">
      <div className="rt-common-footer rt-clear-float">
        <dl className="-column">
          <dt>Tools</dt>
          <dd><a href="#">Download APP</a></dd>
          <dd><a href="#">Support</a></dd>
          <dd><a href="#">API Doc</a></dd>
          <dd><a href="#">Asset Introduction</a></dd>
          <dd><a href="#">Insitution Account</a></dd>
        </dl>
        <dl className="-column">
          <dt>About Us</dt>
          <dd><a href="#">Our Company</a></dd>
          <dd><a href="#">Our Team</a></dd>
          <dd><a href="#">Join Us</a></dd>
          <dd><a href="#">Contact Us</a></dd>
          <dd><a href="#">Token Listing</a></dd>
        </dl>
        <dl className="-column -no-padding-right">
          <dt>Customer Support</dt>
          <dd><a href="#">Feedback</a></dd>
          <dd><a href="#">Fee</a></dd>
          <dd><a href="#">Terms of Service</a></dd>
          <dd><a href="#">Disclosures</a></dd>
          <dd><a href="#">Privacy Policy</a></dd>
        </dl>
        <dl className="-icon">
          <dt>Official Media</dt>
          <dd>
            <a href="#">
              <Icon component={() => FacebookSvg({ width: 16, height: 16 })} />
            </a>
            <a href="#">
              <Icon component={() => FacebookSvg({ width: 16, height: 16 })} />
            </a>
            <a href="#">
              <Icon component={() => FacebookSvg({ width: 16, height: 16 })} />
            </a>
            <a href="#">
              <Icon component={() => FacebookSvg({ width: 16, height: 16 })} />
            </a>
          </dd>
          <dd>
            <a href="#">
              <Icon component={() => FacebookSvg({ width: 16, height: 16 })} />
            </a>
          </dd>
        </dl>
      </div>
    </footer>
  );
};

export default FooterWrap;
