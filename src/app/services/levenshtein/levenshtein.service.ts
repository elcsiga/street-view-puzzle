import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable()
export class LevenshteinService {

  constructor() { }

  levenshteinDistance (s1: string, s2: string): number {
    // http://kevin.vanzonneveld.net
    // +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +            bugfixed by: Onno Marsman
    // +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + reimplemented by: Alexander M Beedie
    // *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *                returns 1: 3

    if (s1 == s2) {
      return 0;
    }

    const s1_len = s1.length;
    const s2_len = s2.length;
    if (s1_len === 0) {
      return s2_len;
    }
    if (s2_len === 0) {
      return s1_len;
    }

    let v0 = new Array(s1_len + 1);
    let v1 = new Array(s1_len + 1);

    let cost = 0;
    for (let s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
      v0[s1_idx] = s1_idx;
    }
    let char_s1 = '',
      char_s2 = '';
    for (let s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
      v1[0] = s2_idx;
      char_s2 = s2[s2_idx - 1];

      for (let s1_idx = 0; s1_idx < s1_len; s1_idx++) {
        char_s1 = s1[s1_idx];
        cost = (char_s1 == char_s2) ? 0 : 1;
        let m_min = v0[s1_idx + 1] + 1;
        let b = v1[s1_idx] + 1;
        let c = v0[s1_idx] + cost;
        if (b < m_min) {
          m_min = b;
        }
        if (c < m_min) {
          m_min = c;
        }
        v1[s1_idx + 1] = m_min;
      }
      let v_tmp = v0;
      v0 = v1;
      v1 = v_tmp;
    }
    return v0[s1_len];
  }
}
